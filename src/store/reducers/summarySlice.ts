import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, store } from 'store';
import { Summary, SummaryDTO, SummaryState } from 'shared/models';
import { mapBalance, mapSummary } from 'shared/helpers';

const initialState: SummaryState = {
  incomes: '0',
  expenses: '0',
  balance: '0',
  categoryExpenseTransactions: [],
  status: 'idle'
};

export const getSummary = createAsyncThunk('summary/getSummary', async (): Promise<Summary> => {
  try {
    const response = await axios.get<{ data: SummaryDTO }>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/summary`);

    const { data } = response.data;
    const { showDecimals } = store.getState().setting;

    return mapSummary(data, showDecimals);
  } catch (error) {
    console.error(error);
    return {} as SummaryState;
  }
});

export const getBalance = createAsyncThunk('summary/getBalance', async (): Promise<Summary['balance']> => {
  try {
    const response = await axios.get<{ data: SummaryDTO['balance'] }>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/summary/balance`);

    const { data } = response.data;
    const { showDecimals } = store.getState().setting;

    return mapBalance(data, showDecimals);
  } catch (error) {
    console.error(error);
    return '0';
  }
});

export const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSummary.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getSummary.rejected, (state) => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getSummary.fulfilled, (state, action: PayloadAction<Summary>) => {
        return {
          ...state,
          ...action.payload,
          status: 'succeeded'
        };
      })
      .addCase(getBalance.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getBalance.rejected, (state) => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getBalance.fulfilled, (state, action: PayloadAction<Summary['balance']>) => {
        return {
          ...state,
          balance: action.payload,
          status: 'succeeded'
        };
      });
  }
});

export const selectSummary = (state: RootState): SummaryState => state.summary;
export const selectBalance = (state: RootState): SummaryState['balance'] => state.summary.balance;

export default summarySlice.reducer;
