import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {useLocation} from "react-router-dom";
import {selectElementsCategories, selectFetchAllCategories} from "../../store/categories";
import {fetchCategories} from "../../store/categoriesThunks";
import Spinner from "../Spinner/Spinner";
import ElementCategory from "./ElementCategory";

const ElementCategories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectElementsCategories);
  const loading = useAppSelector(selectFetchAllCategories);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/categories') {
      dispatch(fetchCategories());
    }
  }, [dispatch, location]);

  return (
    <div>
      {loading ? <Spinner/> : categories.map((element) => (
        <ElementCategory element={element} key={element.id}/>
      ))}
    </div>
  );
};

export default ElementCategories;