import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import {useAppDispatch} from "../../app/hook";
import {showModalAddCategory} from "../../store/categories";

const Categories = () => {
  const dispatch = useAppDispatch();

  const addCategory = () => {
    dispatch(showModalAddCategory())
  }


  return (
    <div>
      <div className='d-flex justify-content-between'>
        Categories
        <NavLink
          to="/categories/add-category"
          className="btn btn-primary"
          onClick={addCategory}
        >
          Add
        </NavLink>
      </div>
      <Outlet/>
    </div>
  );
};

export default Categories;