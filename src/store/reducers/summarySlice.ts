import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'core/axios';
import { store } from 'store';
import { ErrorResponse, Period, StatusState, Summary, SummaryDTO } from 'shared/models';
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

export const getSummary = createAsyncThunk<Summary, Period | undefined, { rejectValue: ErrorResponse }>(
  'summary/getSummary',
  async (period, { rejectWithValue }) => {
    const { defaultPeriod } = store.getState().setting;
    const { activePeriodFilter } = store.getState().summary;
    const queryParams = getQueryParamByPeriod(period || activePeriodFilter || defaultPeriod);

    try {
      const { data } = await axios.get<SummaryDTO>(`summary${queryParams}`);

      if (data) {
        const { defaultCurrency: { iso }, showDecimals } = store.getState().setting;

        return mapSummary(data, iso, showDecimals);
      }

      return {} as Summary;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getBalance = createAsyncThunk<Summary['balance'], void, { rejectValue: ErrorResponse }>(
  'summary/getBalance',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<SummaryDTO['balance']>('summary/balance');
      const { defaultCurrency, showDecimals } = store.getState().setting;

      return mapBalance(data, defaultCurrency.iso, showDecimals) || '0';
    } catch (error: any) {
      return rejectWithValue(error);
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
    },
    resetBalanceStatus(state): SummaryState {
      return {
        ...state,
        balanceStatus: initialState.balanceStatus
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

export const { setActivePeriodFilter, resetSummaryStatus, resetBalanceStatus } = summarySlice.actions;
export default summarySlice.reducer;
