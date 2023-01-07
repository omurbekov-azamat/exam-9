import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {useLocation} from "react-router-dom";
import ElementTransaction from "./ElementTransaction";
import Spinner from "../Spinner/Spinner";
import {selectFetchLoading, selectTransaction} from "../../store/transactions";
import {fetchTransactions} from "../../store/transacationsThunks";


const ElementTransactions = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransaction);
  const loading = useAppSelector(selectFetchLoading);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(fetchTransactions());
    }
  }, [dispatch, location]);

  return (
    <div className='mt-3'>
      {loading && <Spinner/>}
      <div className='overflow-auto' style={{height: '500px'}}>
        {transactions.map((item) => (
          <ElementTransaction
            key={item.id}
            element={item}
          />
        ))}
      </div>
    </div>
  );
};

export default ElementTransactions;