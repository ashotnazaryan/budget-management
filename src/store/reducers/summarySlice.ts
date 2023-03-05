import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { CategoryType, SummaryState, TransactionData } from 'shared/models';

const initialState: SummaryState = {
  incomes: 0,
  expenses: 0,
  balance: 0,
  transactions: []
};

export const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    addIncome: (state, action: PayloadAction<SummaryState['incomes']>) => {
      return {
        ...state,
        incomes: state.incomes + action.payload,
        balance: state.incomes - state.expenses
      };
    },
    addExpense: (state, action: PayloadAction<SummaryState['expenses']>) => {
      return {
        ...state,
        expenses: state.expenses + action.payload,
        balance: state.incomes - state.expenses
      };
    },
    addTransaction: (state, action: PayloadAction<TransactionData>) => {
      const { id, type, amount } = action.payload;
      const categoryAvailable = state.transactions.some((transaction) => transaction.id === id);
      const transactions = categoryAvailable
        ? state.transactions.map((transaction) => ({
          ...transaction,
          amount: id === transaction.id ? transaction.amount + amount : transaction.amount
        }))
        : [...state.transactions, action.payload];

      if (type === CategoryType.income) {
        const incomes = state.incomes + amount;

        return {
          ...state,
          incomes,
          transactions,
          balance: incomes - state.expenses
        };
      }

      const expenses = state.expenses + amount;

      return {
        ...state,
        expenses,
        transactions,
        balance: state.incomes - expenses
      };
    }
  },
});

export const { addIncome, addExpense, addTransaction } = summarySlice.actions;

export const selectSummary = (state: RootState): SummaryState => state.summary;

export default summarySlice.reducer;
