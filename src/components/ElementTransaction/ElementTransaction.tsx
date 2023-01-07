import React from 'react';
import {TransactionApi} from "../../types";

interface Props{
  element: TransactionApi,
}

const ElementTransaction: React.FC<Props> = ({element}) => {
  return (
    <div>
      <p>{element.date}</p>
      <p>{element.name}</p>
      <p>{element.amount}</p>
      <div>
        <button>edit</button>
        <button>delete</button>
      </div>
    </div>
  );
};

export default ElementTransaction;