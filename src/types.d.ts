export interface Category {
  type: string;
  name: string;
}

export interface ApiCategory extends Category {
  id: string;
}

export interface ApiCategoryList {
  [id: string]: Category
}

export interface Transaction extends Category{
  amount: number;
  date: string;
}

export interface TransactionMutation extends Category {
  amount: string;
}

export interface TransactionApi extends Transaction {
  id: string;
}

export interface ApiTransactionList {
  [id: string]: Transaction;
}