import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {createCategory} from "./categoriesThunks";

interface ItemsState {
  modalAddCategory: boolean;
  createNewCategoryLoading: boolean;
  elements: [];
}

const initialState: ItemsState = {
  elements: [],
  modalAddCategory: false,
  createNewCategoryLoading: false,
}

export const categories = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    showModalAddCategory: (state) => {
      state.modalAddCategory = true;
    },
    closeModalAddCategory: (state) => {
      state.modalAddCategory = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCategory.pending, (state) => {
      state.createNewCategoryLoading = true;
    });
    builder.addCase(createCategory.fulfilled, (state) => {
      state.createNewCategoryLoading = false;
      state.modalAddCategory = false;
    });
    builder.addCase(createCategory.rejected, (state) => {
      state.createNewCategoryLoading = false
    });
  }
});

export const categoriesReducer = categories.reducer;
export const {showModalAddCategory, closeModalAddCategory} = categories.actions;
export const selectModalAddCategory = (state: RootState) => state.categories.modalAddCategory;
export const selectCreateLoadingNewCategory = (state: RootState) => state.categories.createNewCategoryLoading;