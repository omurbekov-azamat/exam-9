import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiCategory, ApiCategoryList, Category} from "../types";
import axiosApi from "../axiosApi";
import {AppDispatch} from "../app/store";

export const createCategory = createAsyncThunk<void, Category>(
  'categories/createCategory',
  async (category) => {
    await axiosApi.post('/categories.json', category);
  }
)

export const fetchCategories = createAsyncThunk<ApiCategory[], undefined>(
  'categories/fetchAllCategory',
  async () => {
    const categoryResponse = await axiosApi.get<ApiCategoryList | null>('/categories.json');
    const categories = categoryResponse.data;
    let newCategories: ApiCategory[] = [];

    if (categories) {
      newCategories = Object.keys(categories).map(id => {
        const category = categories[id];

        return {
          ...category,
          id,
        }
      });
    }
    return newCategories;
  }
);

export const fetchOneCategory = createAsyncThunk<ApiCategory, string>(
  'categories/fetchOneCategory',
  async (id) => {
    const response = await axiosApi.get<ApiCategory | null>('/categories/' + id + '.json');
    const category = response.data;

    if (category === null) {
      throw new Error('Not found!');
    }

    return category;
  }
);

interface UpdateCategoryParams {
  id: string;
  element: Category;
}

export const updateCategory = createAsyncThunk<void, UpdateCategoryParams>(
  'categories/update',
  async (params) => {
    await axiosApi.put('/categories/' + params.id + '.json', params.element);
  }
);

export const deleteCategory = createAsyncThunk<void, string, {dispatch: AppDispatch}> (
  'categories/deleteCategory',
  async (id, thunkAPI) => {
    await axiosApi.delete('/categories/' + id + '.json');
    thunkAPI.dispatch(fetchCategories());
  }
);