import React from 'react';
import {ApiTransaction} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {useNavigate} from "react-router-dom";
import {deleteTransaction} from "../../store/transacationsThunks";
import {selectDeleteTransactionLoading} from "../../store/transactions";

interface Props {
  element: ApiTransaction,
}

const ElementTransaction: React.FC<Props> = ({element}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectDeleteTransactionLoading);

  const onDeleteTransaction = async (id: string) => {
    await dispatch(deleteTransaction(id));
  };

  let amountColor = '';
  let amountValue = '';

  if (element.type === 'Expense') {
    amountColor = 'red';
    amountValue = '-' + element.amount
  } else {
    amountColor = 'green'
    amountValue = '+' + element.amount
  }

  return (
    <div className='d-flex justify-content-between border mb-2 p-2 align-items-center'>
      <p className='m-0 me-5'>{element.date}</p>
      <p className='m-0 me-auto text-capitalize'>{element.name}</p>
      <p className='m-0 ms-3 text-uppercase' style={{color: amountColor}}>{amountValue} kgs</p>
      <div className='ms-5'>
        <button
          className='me-3 btn btn-success'
          disabled={deleteLoading ? deleteLoading === element.id : false}
          onClick={() => navigate('/edit-transaction/' + element.id)}
        >
          Edit
        </button>
        <button
          disabled={deleteLoading ? deleteLoading === element.id : false}
          onClick={() => onDeleteTransaction(element.id)}
          className='btn-danger btn'
        >
          {deleteLoading && deleteLoading === element.id && <ButtonSpinner/>}
          Delete
        </button>
      </div>
    </div>
  );
};

export default ElementTransaction;