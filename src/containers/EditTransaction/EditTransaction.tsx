import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {fetchOneTransaction, updateTransaction} from "../../store/transacationsThunks";
import {selectLoadingOneTransaction, selectOneTransaction} from "../../store/transactions";
import ModalAddTransaction from "../../components/Modal/ModalAddTransaction";
import {Transaction} from "../../types";
import Spinner from "../../components/Spinner/Spinner";

const EditTransaction = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const editTransaction = useAppSelector(selectOneTransaction);
  const loading = useAppSelector(selectLoadingOneTransaction);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOneTransaction(id));
  }, [id, dispatch])

  const onEdit = async (element: Transaction) => {
    await dispatch(updateTransaction({
      id: id,
      element,
    }));
    await navigate('/');
  };

  const existingTransaction = editTransaction && {
    ...editTransaction,
    amount: editTransaction.amount.toString()
  };

  return (
    <div>
      {loading && <Spinner/>}
      {existingTransaction && (
        <ModalAddTransaction
          onSubmit={onEdit}
          existingTransaction={existingTransaction}
          isEdit
        />
      )}
    </div>
  );
};

export default EditTransaction;