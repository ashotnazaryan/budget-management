import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Category, CategoryDTO, ErrorResponse, StatusState } from 'shared/models';
import { mapCategories, mapCategory } from 'shared/helpers';
import { RootState } from './rootReducer';
import { resetApp } from './appSlice';
import { getSummary } from './summarySlice';
import { getTransactions } from './transactionSlice';

export interface CategoryState {
  categories: Category[];
  status: StatusState;
  deleteStatus: StatusState;
  currentStatus: StatusState;
  currentCategory?: Category;
  error?: ErrorResponse;
}

const initialState: CategoryState = {
  categories: [],
  status: 'idle',
  currentStatus: 'idle',
  deleteStatus: 'idle'
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

export const getCategory = createAsyncThunk<Category, CategoryDTO['id'], { rejectValue: ErrorResponse }>(
  'categories/getCategory',
  async (id): Promise<Category> => {
    try {
      const response = await axios.get<CategoryDTO>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/categories/${id}`);

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

export const editCategory = createAsyncThunk<void, [Category['id'], Omit<CategoryDTO, 'id'>], { rejectValue: ErrorResponse }>(
  'categories/editCategory',
  async ([id, category], { dispatch, rejectWithValue }): Promise<any> => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/categories/${id}`, category);

      if (response?.data) {
        dispatch(getCategories());
        dispatch(getSummary());
        dispatch(getTransactions());
      }
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.error);
    }
  });

export const deleteCategory = createAsyncThunk<void, Category['id'], { rejectValue: ErrorResponse }>(
  'categories/deleteCategory',
  async (id, { dispatch, rejectWithValue }): Promise<any> => {
    try {
      await axios.delete(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/categories/${id}`);

      dispatch(getCategories());
      dispatch(getSummary());
      dispatch(getTransactions());
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.error);
    }
  });

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    resetCurrentCategory(state): CategoryState {
      return {
        ...state,
        currentCategory: initialState.currentCategory,
        currentStatus: initialState.currentStatus
      };
    },
    resetCategoryStatus(state): CategoryState {
      return {
        ...state,
        status: initialState.status
      };
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getCategories.pending, (state): CategoryState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getCategories.rejected, (state): CategoryState => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getCategories.fulfilled, (state, action: PayloadAction<Category[]>): CategoryState => {
        return {
          ...state,
          categories: action.payload,
          status: 'succeeded'
        };
      })
      .addCase(getCategory.pending, (state): CategoryState => {
        return {
          ...state,
          currentStatus: 'loading'
        };
      })
      .addCase(getCategory.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): CategoryState => {
        return {
          ...state,
          currentStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(getCategory.fulfilled, (state, action: PayloadAction<Category>): CategoryState => {
        return {
          ...state,
          currentCategory: action.payload,
          currentStatus: 'succeeded'
        };
      })
      .addCase(createCategory.pending, (state): CategoryState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(createCategory.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): CategoryState => {
        return {
          ...state,
          status: 'failed',
          error: action.payload
        };
      })
      .addCase(createCategory.fulfilled, (state): CategoryState => {
        return {
          ...state,
          status: 'succeeded'
        };
      })
      .addCase(editCategory.pending, (state): CategoryState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(editCategory.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): CategoryState => {
        return {
          ...state,
          status: 'failed',
          error: action.payload
        };
      })
      .addCase(editCategory.fulfilled, (state): CategoryState => {
        return {
          ...state,
          status: 'succeeded'
        };
      })
      .addCase(deleteCategory.pending, (state): CategoryState => {
        return {
          ...state,
          deleteStatus: 'loading'
        };
      })
      .addCase(deleteCategory.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): CategoryState => {
        return {
          ...state,
          deleteStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(deleteCategory.fulfilled, (state): CategoryState => {
        return {
          ...state,
          deleteStatus: 'succeeded'
        };
      })
      .addCase(resetApp, (): CategoryState => {
        return initialState;
      });
  }
});

export const selectCategory = (state: RootState): CategoryState => state.category;
export const selectCategoryStatus = (state: RootState): CategoryState['status'] => state.category.status;
export const selectCategoryError = (state: RootState): CategoryState['error'] => state.category.error;
export const selectCurrentCategory = (state: RootState): CategoryState['currentCategory'] => state.category.currentCategory;

export const { resetCurrentCategory, resetCategoryStatus } = categorySlice.actions;
export default categorySlice.reducer;
