import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Category, CategoryDTO, CategoryState, ErrorResponse } from 'shared/models';
import { mapCategories } from 'shared/helpers';
import { RootState } from './rootReducer';
import { resetApp } from './appSlice';

const initialState: CategoryState = {
  status: 'idle',
  categories: []
};

export const getCategories = createAsyncThunk('categories/getCategories', async (): Promise<Category[]> => {
  try {
    const response = await axios.get<CategoryDTO[]>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/categories`);

    if (response?.data) {
      return mapCategories(response.data);
    }

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
});

export const createCategory = createAsyncThunk<void, CategoryDTO, { rejectValue: ErrorResponse }>(
  'categories/createCategory',
  async (category, { dispatch, rejectWithValue }): Promise<any> => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/categories/category`, category);

      if (response?.data) {
        dispatch(getCategories());
      }
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.error);
    }
  });

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCategories.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getCategories.rejected, (state) => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        return {
          ...state,
          categories: action.payload,
          status: 'succeeded'
        };
      })
      .addCase(createCategory.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(createCategory.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload
        };
      })
      .addCase(createCategory.fulfilled, (state) => {
        return {
          ...state,
          status: 'succeeded'
        };
      })
      .addCase(resetApp, () => {
        return initialState;
      });
  }
});

export const selectCategory = (state: RootState): CategoryState => state.category;

export default categorySlice.reducer;
