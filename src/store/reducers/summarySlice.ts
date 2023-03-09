import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from 'store';
import { CategoryType, SummaryState, TransactionData } from 'shared/models';

const initialState: SummaryState = {
  incomes: 0,
  expenses: 0,
  balance: 0,
  transactions: [],
  categoryTransactions: []
};

export const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<TransactionData>): SummaryState => {
      const payload = { ...action.payload, uuid: uuidv4(), createdAt: moment().format('LL') };
      const { categoryId, type, amount } = payload;
      const categoryAvailable = state.categoryTransactions.some((transaction) => transaction.categoryId === categoryId);
      const categoryTransactions = categoryAvailable
        ? state.categoryTransactions.map((transaction) => ({
          ...transaction,
          amount: categoryId === transaction.categoryId ? transaction.amount + amount : transaction.amount
        }))
        : [...state.categoryTransactions, payload];

      if (type === CategoryType.income) {
        const incomes = state.incomes + amount;

        return {
          ...state,
          incomes,
          categoryTransactions: categoryTransactions,
          transactions: [...state.transactions, payload],
          balance: incomes - state.expenses
        };
      }

      const expenses = state.expenses + amount;

      return {
        ...state,
        expenses,
        categoryTransactions: categoryTransactions,
        transactions: [...state.transactions, payload],
        balance: state.incomes - expenses
      };
    }
  },
});

export const { addTransaction } = summarySlice.actions;

export const selectSummary = (state: RootState): SummaryState => state.summary;

export default summarySlice.reducer;
