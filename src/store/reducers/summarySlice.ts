import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    addIncome: (state: SummaryState, action: PayloadAction<number>): void => {
      state.incomes = state.incomes + action.payload;
      state.balance = state.incomes - state.expenses;
    },
    addExpense: (state: SummaryState, action: PayloadAction<number>): void => {
      state.expenses = state.expenses + action.payload;
      state.balance = state.incomes - state.expenses;
    }
  },
});

export const { addIncome, addExpense } = summarySlice.actions;

export default summarySlice.reducer;
