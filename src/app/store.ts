import {configureStore} from "@reduxjs/toolkit";
import {categoriesReducer} from "../store/categories";
import {transactionsReducer} from "../store/transactions";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    transactions: transactionsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;