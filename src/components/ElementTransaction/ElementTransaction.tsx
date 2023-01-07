import React from 'react';
import {ApiTransaction} from "../../types";
import dayjs from "dayjs";

interface Props{
  element: ApiTransaction,
}

const ElementTransaction: React.FC<Props> = ({element}) => {
  return (
    <div className='d-flex justify-content-between border mb-2 p-2 align-items-center'>
      <p className='m-0'>{dayjs(element.date).format('DD.MM.YYYY HH:mm:ss')}</p>
      <p className='m-0'>{element.name}</p>
      <p className='m-0'>{element.amount}</p>
      <div>
        <button>edit</button>
        <button>delete</button>
      </div>
    </div>
  );
};

export default ElementTransaction;