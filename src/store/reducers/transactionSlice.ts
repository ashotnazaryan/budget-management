import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, store } from 'store';
import { ErrorResponse, Transaction, TransactionDTO, TransactionState } from 'shared/models';
import { mapTransactions } from 'shared/helpers/transaction.helpers';
import { getSummary } from './summarySlice';

const initialState: TransactionState = {
  transactions: [],
  status: 'idle'
};

export const getTransactions = createAsyncThunk('transaction/getTransactions', async (): Promise<Transaction[]> => {
  try {
    const response = await axios.get<TransactionDTO[]>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/transactions`);

    if (response?.data) {
      const { showDecimals } = store.getState().setting;

      return mapTransactions(response.data, showDecimals);
    }

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
});

export const addTransaction = createAsyncThunk<void, TransactionDTO, { rejectValue: ErrorResponse }>(
  'transaction/addTransaction',
  async (transaction, { dispatch, rejectWithValue }): Promise<any> => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/transactions/transaction`, transaction);

      if (response?.data) {
        dispatch(getSummary());
      }
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.error);
    }
  });

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTransactions.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getTransactions.rejected, (state) => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        return {
          ...state,
          transactions: action.payload,
          status: 'succeeded'
        };
      })
      .addCase(addTransaction.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(addTransaction.rejected, (state) => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(addTransaction.fulfilled, (state) => {
        return {
          ...state,
          status: 'succeeded'
        };
      });
  }
});

export const selectTransaction = (state: RootState): TransactionState => state.transaction;

export default transactionSlice.reducer;
