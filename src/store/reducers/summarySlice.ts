import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { SummaryState } from 'shared/models';

const initialState: SummaryState = {
  incomes: 0,
  expenses: 0,
  balance: 0
};

export const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    addIncome: (state, action: PayloadAction<SummaryState['incomes']>): void => {
      state.incomes = state.incomes + action.payload;
      state.balance = state.incomes - state.expenses;
    },
    addExpense: (state, action: PayloadAction<SummaryState['expenses']>): void => {
      state.expenses = state.expenses + action.payload;
      state.balance = state.incomes - state.expenses;
    }
  },
});

export const { addIncome, addExpense } = summarySlice.actions;

export const selectSummary = (state: RootState): SummaryState => state.summary;

export default summarySlice.reducer;
