import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  fetchOneCategory,
  updateCategory
} from "./categoriesThunks";
import {ApiCategory, Category} from "../types";

interface ItemsState {
  modalAddCategory: boolean;
  createNewCategoryLoading: boolean;
  fetchAllCategories: boolean;
  elements: ApiCategory [];
  oneCategoryEdit: Category | null;
  fetchOneCategory: boolean;
  deleteCategoryLoading: false | string;
}

const initialState: ItemsState = {
  modalAddCategory: false,
  createNewCategoryLoading: false,
  fetchAllCategories: false,
  elements: [],
  oneCategoryEdit: null,
  fetchOneCategory: false,
  deleteCategoryLoading: false,
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
    builder.addCase(fetchCategories.pending, (state) => {
      state.fetchAllCategories = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state,{payload: categories}) => {
      state.fetchAllCategories = false;
      state.elements = categories;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.fetchAllCategories = false;
    });
    builder.addCase(fetchOneCategory.pending, (state) => {
      state.oneCategoryEdit = null;
      state.modalAddCategory = true;
      state.fetchOneCategory = true;
    });
    builder.addCase(fetchOneCategory.fulfilled, (state, {payload: category}) =>{
      state.fetchOneCategory = false;
      state.oneCategoryEdit = category;
    });
    builder.addCase(fetchOneCategory.rejected, (state) => {
      state.fetchOneCategory = false;
    });
    builder.addCase(updateCategory.pending, (state) => {
      state.createNewCategoryLoading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state) => {
      state.createNewCategoryLoading = false;
    });
    builder.addCase(updateCategory.rejected, (state) => {
      state.createNewCategoryLoading = false;
    });
    builder.addCase(deleteCategory.pending, (state, {meta}) => {
      state.deleteCategoryLoading = meta.arg;
    });
    builder.addCase(deleteCategory.fulfilled, (state) => {
      state.deleteCategoryLoading = false;
    });
    builder.addCase(deleteCategory.rejected, (state) => {
      state.deleteCategoryLoading = false;
    });
  }
});

export const categoriesReducer = categories.reducer;
export const {showModalAddCategory, closeModalAddCategory,} = categories.actions;
export const selectModalAddCategory = (state: RootState) => state.categories.modalAddCategory;
export const selectCreateLoadingNewCategory = (state: RootState) => state.categories.createNewCategoryLoading;
export const selectFetchAllCategories = (state: RootState) => state.categories.fetchAllCategories;
export const selectElementsCategories = (state: RootState) => state.categories.elements;
export const selectEditOneElement = (state: RootState) => state.categories.oneCategoryEdit;
export const selectDeleteLoading = (state: RootState) => state.categories.deleteCategoryLoading;
export const selectFetchCategory = (state: RootState) => state.categories.fetchOneCategory;