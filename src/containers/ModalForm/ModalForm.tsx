import React from 'react';
import ModalAddCategory from "../../components/Modal/ModalAddCategory";
import {useAppDispatch} from "../../app/hook";
import {createCategory} from "../../store/categoriesThunks";
import {Category} from "../../types";

const ModalForm = () => {
  const dispatch = useAppDispatch();

  const submit = async (element: Category) => {
    await dispatch(createCategory(element));
  }

  return (
    <ModalAddCategory onSubmit={submit}/>
  );
};

export default ModalForm;