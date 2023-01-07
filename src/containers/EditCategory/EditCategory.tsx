import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {fetchOneCategory, updateCategory} from "../../store/categoriesThunks";
import {selectEditOneElement, selectFetchCategory} from "../../store/categories";
import ModalAddCategory from "../../components/Modal/ModalAddCategory";
import {Category} from "../../types";
import Spinner from "../../components/Spinner/Spinner";

const EditCategory = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const editCategory = useAppSelector(selectEditOneElement)
  const navigate = useNavigate();
  const loading = useAppSelector(selectFetchCategory)

  useEffect(() => {
    dispatch(fetchOneCategory(id));
  }, [id, dispatch])

  const onEdit = async (element: Category) => {
    await dispatch(updateCategory({
      id: id,
      element,
    }));
    navigate('/categories');
  }

  return (
    <div>
      {loading && <Spinner/>}
      {editCategory && (
        <ModalAddCategory
          existingCategory={editCategory}
          onSubmit={onEdit}
        />
      )}
    </div>
  );
};

export default EditCategory;