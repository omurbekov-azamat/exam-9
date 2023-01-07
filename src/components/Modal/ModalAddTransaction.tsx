import React, {useState} from 'react';
import Backdrop from "../Backdrop/Backdrop";
import {TYPE} from "../../constants";
import {Transaction, TransactionMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {
  selectElementsCategories,
} from "../../store/categories";
import {useNavigate} from "react-router-dom";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {closeModalAddTransaction, selectModalTransaction, selectSendTransaction} from "../../store/transactions";

interface Props {
  existingTransaction?: TransactionMutation;
  onSubmit: (element: Transaction) => void;
  isEdit?: boolean;
}

const initialState: TransactionMutation = {
  type: '',
  name: '',
  amount: '',
}

type ChangedElement = HTMLInputElement | HTMLSelectElement;

const ModalAddTransaction: React.FC<Props> = ({onSubmit, existingTransaction = initialState, isEdit}) => {
  const [transaction, setTransaction] = useState<TransactionMutation>(existingTransaction);
  const categories = useAppSelector(selectElementsCategories);
  const show = useAppSelector(selectModalTransaction);
  const loading = useAppSelector(selectSendTransaction);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const closeModal = () => {
    dispatch(closeModalAddTransaction());
    navigate('/');
  };

  const onChangeTransaction = (event: React.ChangeEvent<ChangedElement>) => {
    const {name, value} = event.target;
    setTransaction(prev => ({...prev, [name]: value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      ...transaction,
      amount: parseFloat(transaction.amount),
      date: new Date().toISOString(),
    });

    setTransaction({
      type: '',
      name: '',
      amount: '',
    });
  }

  return (
    <>
      <Backdrop show={show}/>
      <div className='modal show'
           style={{display: show ? 'block' : 'none'}}
      >
        <div className='modal-dialog' onClick={e => e.stopPropagation()}>
          <div className='modal-content'>
            <div className='text-center'>
              <h4 className='modal-title fs-5'>{isEdit ? 'Edit Transaction' : 'Add new Transaction'}</h4>
            </div>
            <div className='p-3'>
              <form onSubmit={onFormSubmit}>
                <div className='p-1'>
                  <label htmlFor="type">Type</label>
                  <select
                    name="type" id="type"
                    className='form-select mt-2'
                    required
                    value={transaction.type}
                    onChange={onChangeTransaction}
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
                  <select
                    name='name' id='name'
                    className='form-select mt-2 text-capitalize'
                    required
                    value={transaction.name}
                    onChange={onChangeTransaction}
                  >
                    {transaction.name ? <option value={transaction.name}
                    >{transaction.name}</option> : categories.map(item => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                    ))}
                  </select>
                </div>
                <div className='p-1'>
                  <label htmlFor='amount'>Amount</label>
                  <div className='d-flex align-items-center mt-2'>
                    <input
                      type='number'
                      name='amount'
                      id='amount'
                      className='form-control'
                      required
                      value={transaction.amount}
                      onChange={onChangeTransaction}
                    />
                    <span className='text-uppercase border rounded-3 p-2'>kgs</span>
                  </div>
                </div>
                <div className='text-center mt-2'>
                  <button
                    className='btn btn-primary me-3'
                    onClick={closeModal}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    className='btn btn-success'
                    disabled={loading}
                    type='submit'
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

export default ModalAddTransaction;