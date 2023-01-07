import {createSlice} from "@reduxjs/toolkit";

interface ItemsState {
  elements: [];
}

const initialState: ItemsState = {
  elements: [],
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
});

export const itemsReducer = itemsSlice.reducer;