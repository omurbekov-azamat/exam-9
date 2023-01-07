import React, {useEffect} from 'react';
import {Transaction} from "../../types";
import ModalAddTransaction from "../../components/Modal/ModalAddTransaction";
import {useAppDispatch} from "../../app/hook";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchCategories} from "../../store/categoriesThunks";
import {createTransaction} from "../../store/transacationsThunks";

const AddTransaction = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/add') {
      dispatch(fetchCategories());
    }
  }, [dispatch, location]);


  const submit = async (element: Transaction) => {
    await dispatch(createTransaction(element));
    await navigate('/');
  };

  return (
    <div>
      <ModalAddTransaction onSubmit={submit}/>
    </div>
  );
};

export default AddTransaction;