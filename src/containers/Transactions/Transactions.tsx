import React from 'react';
import ElementTransactions from "../../components/ElementTransaction/ElementTransactions";
import {Outlet} from "react-router-dom";
import {useAppSelector} from "../../app/hook";
import {selectTransaction} from "../../store/transactions";

const Transactions = () => {
  const transactions = useAppSelector(selectTransaction);

  const income = transactions.reduce((sum, element) => {

    if (element.type === 'Income') {
      return sum + element.amount
    }
    return sum
  }, 0);

  const expense = transactions.reduce((sum, element) => {

    if (element.type === 'Expense') {
      return sum - element.amount;
    }
    return sum
  }, income);


  return (
    <>
      <p className='border'>Total: {expense} KGS</p>
      <ElementTransactions/>
      <Outlet/>
    </>
  );
};

export default Transactions;