import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Category, CategoryDTO, ErrorResponse, StatusState } from 'shared/models';
import { mapCategories, mapCategory } from 'shared/helpers';
import { RootState } from './rootReducer';
import { resetApp } from './appSlice';

export interface CategoryState {
  categories: Category[];
  status: StatusState;
  currentCategory?: Category;
  error?: ErrorResponse;
}

const initialState: CategoryState = {
  status: 'idle',
  categories: []
};

export const getCategories = createAsyncThunk<Category[], void>('categories/getCategories', async (): Promise<Category[]> => {
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

export const getCategory = createAsyncThunk<Category, CategoryDTO['_id'], { rejectValue: ErrorResponse }>(
  'categories/getCategory',
  async (categoryId): Promise<Category> => {
    try {
      const response = await axios.get<CategoryDTO>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/categories/${categoryId}`);

      if (response?.data) {
        return mapCategory(response.data);
      }

      return {} as Category;
    } catch (error) {
      console.error(error);
      return {} as Category;
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

export const editCategory = createAsyncThunk<void, [Category['id'], Omit<CategoryDTO, '_id'>], { rejectValue: ErrorResponse }>(
  'categories/editCategory',
  async ([categoryId, category], { dispatch, rejectWithValue }): Promise<any> => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/categories/${categoryId}`, category);

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
  reducers: {
    resetCurrentCategory(state) {
      return {
        ...state,
        currentCategory: undefined
      };
    },
  },
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
      .addCase(getCategory.fulfilled, (state, action) => {
        return {
          ...state,
          currentCategory: action.payload
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
      .addCase(editCategory.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(editCategory.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload
        };
      })
      .addCase(editCategory.fulfilled, (state) => {
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
export const selectCurrentCategory = (state: RootState): CategoryState['currentCategory'] => state.category.currentCategory;

export const { resetCurrentCategory } = categorySlice.actions;
export default categorySlice.reducer;
