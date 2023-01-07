import React from 'react';
import ModalAddCategory from "../../components/Modal/ModalAddCategory";
import {useAppDispatch} from "../../app/hook";
import {createCategory} from "../../store/categoriesThunks";
import {Category} from "../../types";
import {useNavigate} from "react-router-dom";

const ModalForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submit = async (element: Category) => {
    await dispatch(createCategory(element));
    await navigate('/categories')
  }

  return (
    <ModalAddCategory onSubmit={submit}/>
  );
};

export default ModalForm;