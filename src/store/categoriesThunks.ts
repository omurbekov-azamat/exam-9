import {createAsyncThunk} from "@reduxjs/toolkit";
import {FormCategory} from "../types";
import axiosApi from "../axiosApi";

export const createCategory = createAsyncThunk<void, FormCategory>(
  'categories/createCategory',
  async (category) => {
    await axiosApi.post('/categories.json', category);
  }
)