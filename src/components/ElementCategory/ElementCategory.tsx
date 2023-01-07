import React from 'react';
import {useNavigate} from "react-router-dom";
import {ApiCategory} from "../../types";
import {deleteCategory} from "../../store/categoriesThunks";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectDeleteLoading} from "../../store/categories";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  element: ApiCategory;
}

const ElementCategory: React.FC<Props> = ({element}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectDeleteLoading);

  const onDeleteCategory = async (id: string) => {
    await dispatch(deleteCategory(id));
  }

  return (
    <div
      className='text-capitalize d-flex justify-content-between align-items-center border p-2 mt-2'
    >
      <p className='m-0'>{element.name}</p>
      <div className='d-flex'>
        <p className='m-0'>{element.type}</p>
        <div className='ms-5'>
          <button
            className='me-2'
            onClick={() => navigate('/categories/edit-category/' + element.id)}>
            Edit
          </button>
          <button
            onClick={() => onDeleteCategory(element.id)}
            disabled={deleteLoading ? deleteLoading === element.id : false}
          >
            {deleteLoading && deleteLoading === element.id && <ButtonSpinner/>}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElementCategory;