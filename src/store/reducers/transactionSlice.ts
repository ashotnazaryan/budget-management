import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'core/axios';
import { store } from 'store';
import { Category, ErrorResponse, StatusState, Transaction, TransactionDTO } from 'shared/models';
import { mapTransaction, mapTransactions } from 'shared/helpers';
import { RootState } from './rootReducer';
import { resetBalanceStatus, resetSummaryStatus } from './summarySlice';
import { resetAccountsStatus } from './accountSlice';
import { resetApp } from './appSlice';

export interface TransactionState {
  transactions: Transaction[];
  status: StatusState;
  getStatus: StatusState;
  createEditStatus: StatusState;
  deleteStatus: StatusState;
  currentTransaction?: Transaction;
  filters: TransactionFilters;
  error?: ErrorResponse;
}

export interface TransactionFilters {
  categoryId?: Category['id'];
}

const initialState: TransactionState = {
  transactions: [],
  filters: {},
  status: 'idle',
  getStatus: 'idle',
  createEditStatus: 'idle',
  deleteStatus: 'idle'
};

export const getTransactions = createAsyncThunk<Transaction[], void, { rejectValue: ErrorResponse }>(
  'transactions/getTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const { filters } = store.getState().transaction;
      const url = filters?.categoryId ? `transactions?categoryId=${filters.categoryId}` : 'transactions';
      const { data } = await axios.get<TransactionDTO[]>(url);

      if (data) {
        const { showDecimals } = store.getState().setting;

        return mapTransactions(data, showDecimals);
      }

      return [];
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const getTransaction = createAsyncThunk<Transaction, TransactionDTO['id'], { rejectValue: ErrorResponse }>(
  'transactions/getTransaction',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<TransactionDTO>(`transactions/${id}`);

      if (data) {
        const { showDecimals } = store.getState().setting;

        return mapTransaction(data, showDecimals);
      }

      return {} as Transaction;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const addTransaction = createAsyncThunk<void, TransactionDTO, { rejectValue: ErrorResponse }>(
  'transactions/addTransaction',
  async (transaction, { dispatch, rejectWithValue }) => {
    try {
      await axios.post<void>('transactions/transaction', transaction);

      dispatch(resetTransactionsStatus());
      dispatch(resetSummaryStatus());
      dispatch(resetBalanceStatus());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const editTransaction = createAsyncThunk<void, [Transaction['id'], Omit<TransactionDTO, 'id'>], { rejectValue: ErrorResponse }>(
  'transactions/editTransaction',
  async ([id, transaction], { dispatch, rejectWithValue }) => {
    try {
      await axios.put<void>(`transactions/${id}`, transaction);

      dispatch(resetTransactionsStatus());
      dispatch(resetSummaryStatus());
      dispatch(resetBalanceStatus());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const deleteTransaction = createAsyncThunk<void, Transaction['id'], { rejectValue: ErrorResponse }>(
  'transactions/deleteTransaction',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete<void>(`transactions/${id}`);

      dispatch(resetTransactionsStatus());
      dispatch(resetSummaryStatus());
      dispatch(resetBalanceStatus());
      dispatch(resetAccountsStatus());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    resetTransactionsStatus(state): TransactionState {
      return {
        ...state,
        status: initialState.status
      };
    },
    resetGetTransactionStatus(state): TransactionState {
      return {
        ...state,
        currentTransaction: initialState.currentTransaction,
        getStatus: initialState.getStatus
      };
    },
    setGetTransactionErrorStatus(state): TransactionState {
      return {
        ...state,
        getStatus: 'failed'
      };
    },
    setTransactionFilters(state, action: PayloadAction<TransactionFilters>): TransactionState {
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    },
    resetTransactionFilters(state): TransactionState {
      return {
        ...state,
        filters: {}
      };
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getTransactions.pending, (state): TransactionState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getTransactions.rejected, (state): TransactionState => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>): TransactionState => {
        return {
          ...state,
          transactions: action.payload,
          status: 'succeeded'
        };
      })
      .addCase(getTransaction.pending, (state): TransactionState => {
        return {
          ...state,
          getStatus: 'loading'
        };
      })
      .addCase(getTransaction.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): TransactionState => {
        return {
          ...state,
          getStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(getTransaction.fulfilled, (state, action: PayloadAction<Transaction>): TransactionState => {
        return {
          ...state,
          currentTransaction: action.payload,
          getStatus: 'succeeded'
        };
      })
      .addCase(addTransaction.pending, (state): TransactionState => {
        return {
          ...state,
          createEditStatus: 'loading'
        };
      })
      .addCase(addTransaction.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): TransactionState => {
        return {
          ...state,
          error: action.payload,
          createEditStatus: 'failed'
        };
      })
      .addCase(addTransaction.fulfilled, (state): TransactionState => {
        return {
          ...state,
          createEditStatus: 'succeeded'
        };
      })
      .addCase(editTransaction.pending, (state): TransactionState => {
        return {
          ...state,
          createEditStatus: 'loading'
        };
      })
      .addCase(editTransaction.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): TransactionState => {
        return {
          ...state,
          createEditStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(editTransaction.fulfilled, (state): TransactionState => {
        return {
          ...state,
          createEditStatus: 'succeeded'
        };
      })
      .addCase(deleteTransaction.pending, (state): TransactionState => {
        return {
          ...state,
          deleteStatus: 'loading'
        };
      })
      .addCase(deleteTransaction.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): TransactionState => {
        return {
          ...state,
          deleteStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(deleteTransaction.fulfilled, (state): TransactionState => {
        return {
          ...state,
          deleteStatus: 'succeeded'
        };
      })
      .addCase(resetApp, (): TransactionState => {
        return initialState;
      });
  }
});

export const selectTransaction = (state: RootState): TransactionState => state.transaction;
export const selectTransactionStatus = (state: RootState): TransactionState['status'] => state.transaction.status;
export const selectTransactionError = (state: RootState): TransactionState['error'] => state.transaction.error;
export const selectCurrentTransaction = (state: RootState): TransactionState['currentTransaction'] => state.transaction.currentTransaction;
export const selectTransactionsFilters = (state: RootState): TransactionState['filters'] => state.transaction.filters;

export const { resetGetTransactionStatus, resetTransactionsStatus, setGetTransactionErrorStatus, setTransactionFilters, resetTransactionFilters } = transactionSlice.actions;
export default transactionSlice.reducer;
