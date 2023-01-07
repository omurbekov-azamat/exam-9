import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectLoadingFetchTransactions, selectTransactions} from "../../store/categories";
import {useLocation} from "react-router-dom";
import {fetchTransactions} from "../../store/categoriesThunks";
import ElementTransaction from "./ElementTransaction";
import Spinner from "../Spinner/Spinner";

const ElementTransactions = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const loading = useAppSelector(selectLoadingFetchTransactions);
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