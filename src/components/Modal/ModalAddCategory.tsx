import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {closeModalAddCategory, selectCreateLoadingNewCategory, selectModalAddCategory,} from "../../store/categories";
import Backdrop from "../Backdrop/Backdrop";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {TYPE} from "../../constants";
import {Category} from "../../types";

interface Props {
  existingCategory?: Category;
  onSubmit: (element: Category) => void;
}

const initialState: Category = {
  type: '',
  name: '',
}

type ChangedElement = HTMLInputElement | HTMLSelectElement;

const ModalAddCategory: React.FC<Props> = ({onSubmit, existingCategory = initialState}) => {
  const [category, setCategory] = useState<Category>(existingCategory);
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectModalAddCategory)
  const loading = useAppSelector(selectCreateLoadingNewCategory);
  const navigate = useNavigate();

  const closeModal = () => {
    dispatch(closeModalAddCategory());
    navigate('/categories');
  };

  const onCategoryChange = (evants: React.ChangeEvent<ChangedElement>) => {
    const {name, value} = evants.target;
    setCategory(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(category);
    setCategory({
      type: '',
      name: '',
    });
  };

  return (
    <>
      <Backdrop show={show}/>
      <div className='modal show'
           style={{display: show ? 'block': 'none'}}
      >
        <div className='modal-dialog' onClick={e => e.stopPropagation()}>
          <div className='modal-content'>
            <div className='text-center'>
              <h4 className='modal-title fs-5'>Add new category</h4>
            </div>
            <div className='p-3'>
              <form onSubmit={onFormSubmit}>
                <div className='p-1'>
                  <label htmlFor="type">Type</label>
                  <select
                    name="type" id="type"
                    className='form-select mt-2'
                    required
                    value={category.type}
                    onChange={onCategoryChange}
                  >
                    <option value=''>Select a type</option>
                    {TYPE.map(item => (
                      <option key={item.type} value={item.type}>
                        {item.type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='p-1'>
                  <label htmlFor="name">Name</label>
                  <input
                    value={category.name}
                    type="text"
                    id='name'
                    name='name'
                    required
                    className='form-control mt-2'
                    onChange={onCategoryChange}
                  />
                </div>
                <div className='text-center mt-2'>
                  <button
                    type='submit'
                    className='btn btn-primary me-3'
                    onClick={closeModal}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    className='btn btn-success'
                    disabled={loading}
                  >
                    {loading && <ButtonSpinner/>}
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAddCategory;