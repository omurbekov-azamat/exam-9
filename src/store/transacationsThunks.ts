import {ApiTransaction, ApiTransactionList, Transaction} from "../types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {AppDispatch} from "../app/store";
import dayjs from "dayjs";

export const fetchTransactions = createAsyncThunk<ApiTransaction[], undefined> (
  'transactions/fetchTransactions',
  async () => {
    const transactionsResponse = await axiosApi.get<ApiTransactionList | null>('/transactions.json');
    const transactions = transactionsResponse.data;

    let newTransactions: ApiTransaction[] = [];

    if (transactions) {
      newTransactions = Object.keys(transactions).map(id => {
        const transaction = transactions[id];

        return {
          ...transaction,
          date: dayjs(transaction.date).format('DD.MM.YYYY HH:mm:ss'),
          id,
        }
      });
    }

    return newTransactions;
  }
);

export const deleteTransaction = createAsyncThunk<void, string, {dispatch: AppDispatch}>(
  'transactions/deleteTransaction',
  async (id, thunkAPI) => {
    await axiosApi.delete('/transactions/' + id + '.json');
    thunkAPI.dispatch(fetchTransactions());
  }
);

export const createTransaction = createAsyncThunk<void, Transaction>(
  'transactions/createTransaction',
  async (transaction) => {
    await axiosApi.post('/transactions.json', transaction);
  }
);

export const fetchOneTransaction = createAsyncThunk<Transaction, string>(
  'transactions/fetchTransaction',
  async (id) => {
    const response = await axiosApi.get<ApiTransaction | null>('/transactions/' + id + '.json');
    const transaction = response.data;

    if (transaction === null) {
      throw  new Error('Not found');
    }

    return transaction;
  }
);

interface UpdateTransaction {
  id: string;
  element: Transaction;
}

export const updateTransaction = createAsyncThunk<void, UpdateTransaction>(
  'transactions/updateTransaction',
  async (params) => {
    await axiosApi.put('/transactions/' + params.id + '.json', params.element);
  }
);
