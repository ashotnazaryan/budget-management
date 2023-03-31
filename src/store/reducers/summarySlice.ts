import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, store } from 'store';
import { Summary, SummaryDTO, SummaryState } from 'shared/models';
import { mapBalance, mapSummary } from 'shared/helpers';

const initialState: SummaryState = {
  incomes: '0',
  expenses: '0',
  balance: '0',
  categoryExpenseTransactions: [],
  categoryIncomeTransactions: [],
  status: 'idle'
};

export const getSummary = createAsyncThunk('summary/getSummary', async (): Promise<Summary> => {
  try {
    const response = await axios.get<SummaryDTO>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/summary`);

    if (response?.data) {
      const { showDecimals } = store.getState().setting;

      return mapSummary(response.data, showDecimals);
    }

    return {} as Summary;
  } catch (error) {
    console.error(error);
    return {} as Summary;
  }
});

export const getBalance = createAsyncThunk('summary/getBalance', async (): Promise<Summary['balance']> => {
  try {
    const response = await axios.get<SummaryDTO['balance']>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/summary/balance`);

    if (response?.data) {
      const { showDecimals } = store.getState().setting;

      return mapBalance(response.data, showDecimals);
    }

    return '0';
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
      .addCase(getSummary.fulfilled, (state, action) => {
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
      .addCase(getBalance.fulfilled, (state, action) => {
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
