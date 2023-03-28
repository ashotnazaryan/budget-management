import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, store } from 'store';
import { Transaction, TransactionDTO, TransactionState } from 'shared/models';
import { mapTransactions } from 'shared/helpers/transaction.helpers';
import { getSummary } from './summarySlice';

const initialState: TransactionState = {
  transactions: [],
  status: 'idle'
};

export const getTransactions = createAsyncThunk('transaction/getTransactions', async (): Promise<Transaction[]> => {
  try {
    const response = await axios.get<{ data: TransactionDTO[] }>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/transactions`);

    const { data } = response.data;
    const { showDecimals } = store.getState().setting;

    return mapTransactions(data, showDecimals);
  } catch (error) {
    console.error(error);
    return [];
  }
});

export const addTransaction = createAsyncThunk('transaction/addTransaction', async (transaction: TransactionDTO, { dispatch }): Promise<void> => {
  try {
    await axios.post<void>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/transactions/transaction`, transaction);
    dispatch(getSummary());
  } catch (error) {
    console.error(error);
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
      .addCase(getTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        return {
          ...state,
          transactions: action.payload,
          status: 'succeeded'
        };
      });
  }
});

export const selectTransaction = (state: RootState): TransactionState => state.transaction;

export default transactionSlice.reducer;
