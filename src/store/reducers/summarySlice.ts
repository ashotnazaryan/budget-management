import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'core/axios';
import { store } from 'store';
import { Period, StatusState, Summary, SummaryDTO } from 'shared/models';
import { getQueryParamByPeriod, mapBalance, mapSummary } from 'shared/helpers';
import { RootState } from './rootReducer';
import { resetApp } from './appSlice';

export interface SummaryState extends Summary {
  status: StatusState;
  balanceStatus: StatusState;
  activePeriodFilter: Period;
}

const initialState: SummaryState = {
  incomes: '0',
  expenses: '0',
  profit: '0',
  balance: '0',
  categoryExpenseTransactions: [],
  categoryIncomeTransactions: [],
  activePeriodFilter: Period.month,
  status: 'idle',
  balanceStatus: 'idle'
};

export const getSummary = createAsyncThunk('summary/getSummary', async (period?: Period): Promise<Summary> => {
  const { defaultPeriod } = store.getState().setting;
  const { activePeriodFilter } = store.getState().summary;
  const queryParams = getQueryParamByPeriod(period || activePeriodFilter || defaultPeriod);

  try {
    const response = await axios.get<SummaryDTO>(`summary${queryParams}`);

    if (response?.data) {
      const { defaultCurrency: { iso }, showDecimals } = store.getState().setting;

      return mapSummary(response.data, iso, showDecimals);
    }

    return {} as Summary;
  } catch (error) {
    console.error(error);
    return {} as Summary;
  }
});

export const getBalance = createAsyncThunk('summary/getBalance', async (): Promise<Summary['balance']> => {
  try {
    const response = await axios.get<SummaryDTO['balance']>('summary/balance');
    const { defaultCurrency, showDecimals } = store.getState().setting;

    return mapBalance(response.data, defaultCurrency.iso, showDecimals) || '0';
  } catch (error) {
    console.error(error);
    return '0';
  }
});

export const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    setActivePeriodFilter(state, action: PayloadAction<Period>): SummaryState {
      return {
        ...state,
        activePeriodFilter: action.payload
      };
    },
    resetSummaryStatus(state): SummaryState {
      return {
        ...state,
        status: initialState.status
      };
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getSummary.pending, (state): SummaryState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getSummary.rejected, (state): SummaryState => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getSummary.fulfilled, (state, action: PayloadAction<Summary>): SummaryState => {
        return {
          ...state,
          ...action.payload,
          status: 'succeeded'
        };
      })
      .addCase(getBalance.pending, (state): SummaryState => {
        return {
          ...state,
          balanceStatus: 'loading'
        };
      })
      .addCase(getBalance.rejected, (state): SummaryState => {
        return {
          ...state,
          balanceStatus: 'failed'
        };
      })
      .addCase(getBalance.fulfilled, (state, action: PayloadAction<Summary['balance']>): SummaryState => {
        return {
          ...state,
          balance: action.payload,
          balanceStatus: 'succeeded'
        };
      })
      .addCase(resetApp, (): SummaryState => {
        return initialState;
      });
  }
});

export const selectSummary = (state: RootState): SummaryState => state.summary;
export const selectBalance = (state: RootState): SummaryState['balance'] => state.summary.balance;

export const { setActivePeriodFilter, resetSummaryStatus } = summarySlice.actions;
export default summarySlice.reducer;
