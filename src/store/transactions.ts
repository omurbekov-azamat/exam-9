import {ApiTransaction, Transaction} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {
  createTransaction,
  deleteTransaction,
  fetchOneTransaction,
  fetchTransactions,
  updateTransaction
} from "./transacationsThunks";

interface ItemsState {
  modalTransaction: boolean;
  submitLoading: boolean;
  fetchTransactions: boolean;
  items: ApiTransaction[];
  loadingDeleteTransaction: false | string;
  item: Transaction | null;
  fetchOneTransaction: boolean;
}

const initialState: ItemsState = {
  modalTransaction: false,
  submitLoading: false,
  fetchTransactions: false,
  items: [],
  loadingDeleteTransaction: false,
  item: null,
  fetchOneTransaction: false,
}

export const transactions = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    showModalAddTransaction: (state)=> {
      state.modalTransaction = true;
    },
    closeModalAddTransaction: (state) => {
      state.modalTransaction = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.fetchTransactions = true;
    });
    builder.addCase(fetchTransactions.fulfilled, (state,{payload: transactions}) => {
      state.fetchTransactions = false;
      state.items = transactions;
    });
    builder.addCase(fetchTransactions.rejected, (state) => {
      state.fetchTransactions = false;
    });
    builder.addCase(deleteTransaction.pending, (state, {meta}) => {
      state.loadingDeleteTransaction = meta.arg;
    });
    builder.addCase(deleteTransaction.fulfilled,  (state) => {
      state.loadingDeleteTransaction = false;
    });
    builder.addCase(deleteTransaction.rejected,  (state) => {
      state.loadingDeleteTransaction = false;
    });
    builder.addCase(createTransaction.pending, (state) => {
      state.submitLoading = true;
    });
    builder.addCase(createTransaction.fulfilled, (state) => {
      state.submitLoading = false;
    });
    builder.addCase(createTransaction.rejected, (state) => {
      state.submitLoading = false;
    });
    builder.addCase(fetchOneTransaction.pending, (state) => {
      state.item = null;
      state.modalTransaction = true;
      state.fetchOneTransaction = true;
    });
    builder.addCase(fetchOneTransaction.fulfilled, (state, {payload: transaction}) =>{
      state.fetchOneTransaction = false;
      state.item = transaction;
    });
    builder.addCase(fetchOneTransaction.rejected, (state) => {
      state.fetchOneTransaction = false;
    });
    builder.addCase(updateTransaction.pending, (state) => {
      state.submitLoading = true;
    });
    builder.addCase(updateTransaction.fulfilled, (state) => {
      state.submitLoading = false;
    });
    builder.addCase(updateTransaction.rejected, (state) => {
      state.submitLoading = false;
    });
  },
});

export const transactionsReducer = transactions.reducer;
export const {showModalAddTransaction, closeModalAddTransaction} = transactions.actions;
export const selectModalTransaction = (state: RootState) => state.transactions.modalTransaction;
export const selectFetchLoading = (state: RootState) => state.transactions.fetchTransactions;
export const selectTransaction = (state: RootState) => state.transactions.items;
export const selectDeleteTransactionLoading = (state: RootState) => state.transactions.loadingDeleteTransaction;
export const selectSendTransaction = (state: RootState) => state.transactions.submitLoading;
export const selectOneTransaction = (state: RootState) => state.transactions.item;
export const selectLoadingOneTransaction = (state:RootState) => state.transactions.fetchOneTransaction;
