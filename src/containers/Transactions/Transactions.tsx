import React from 'react';
import ElementTransactions from "../../components/ElementTransaction/ElementTransactions";
import {Outlet} from "react-router-dom";

const Transactions = () => {
  return (
    <div>
      <ElementTransactions/>
      <Outlet/>
    </div>
  );
};

export default Transactions;