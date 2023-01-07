import React from 'react';
import {ApiTransaction} from "../../types";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectLoadingDeleteTransaction} from "../../store/categories";
import {deleteTransaction} from "../../store/categoriesThunks";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props{
  element: ApiTransaction,
}

const ElementTransaction: React.FC<Props> = ({element}) => {
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectLoadingDeleteTransaction);

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
      <p className='m-0'>{dayjs(element.date).format('DD.MM.YYYY HH:mm:ss')}</p>
      <div className='d-flex'>
        <p className='m-0'>{element.name}</p>
        <p className='m-0 ms-3' style={{color: amountColor}}>{amountValue}</p>
      </div>
      <div>
        <button
          className='me-3 btn btn-success'
          disabled={deleteLoading ? deleteLoading === element.id : false}
        >
          Edit
        </button>
        <button
          disabled={deleteLoading ? deleteLoading === element.id: false}
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