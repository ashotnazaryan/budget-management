import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'core/axios';
import { store } from 'store';
import { ErrorResponse, StatusState, Transaction, TransactionDTO } from 'shared/models';
import { mapTransaction, mapTransactions } from 'shared/helpers';
import { RootState } from './rootReducer';
import { getSummary } from './summarySlice';
import { resetApp } from './appSlice';
import { getAccounts } from './accountSlice';

export interface TransactionState {
  transactions: Transaction[];
  status: StatusState;
  deleteStatus: StatusState;
  currentStatus: StatusState;
  currentTransaction?: Transaction;
  error?: ErrorResponse;
}

const initialState: TransactionState = {
  transactions: [],
  status: 'idle',
  currentStatus: 'idle',
  deleteStatus: 'idle'
};

export const getTransactions = createAsyncThunk<Transaction[], void, { rejectValue: ErrorResponse }>(
  'transactions/getTransactions',
  async (_, { rejectWithValue }): Promise<any> => {
    try {
      const { data } = await axios.get<TransactionDTO[]>('transactions');

      if (data) {
        const { showDecimals } = store.getState().setting;

        return mapTransactions(data, showDecimals);
      }

      return [];
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error);
    }
  });

export const getTransaction = createAsyncThunk<Transaction, TransactionDTO['id'], { rejectValue: ErrorResponse }>(
  'transactions/getTransaction',
  async (id, { rejectWithValue }): Promise<any> => {
    try {
      const { data } = await axios.get<TransactionDTO>(`transactions/${id}`);

      if (data) {
        const { showDecimals } = store.getState().setting;

        return mapTransaction(data, showDecimals);
      }

      return {} as Transaction;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error);
    }
  });

export const addTransaction = createAsyncThunk<void, TransactionDTO, { rejectValue: ErrorResponse }>(
  'transactions/addTransaction',
  async (transaction, { dispatch, rejectWithValue }): Promise<any> => {
    try {
      await axios.post('transactions/transaction', transaction);

      dispatch(getSummary());
      dispatch(getTransactions());
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error);
    }
  });

export const editTransaction = createAsyncThunk<void, [Transaction['id'], Omit<TransactionDTO, 'id'>], { rejectValue: ErrorResponse }>(
  'transactions/editTransaction',
  async ([id, transaction], { dispatch, rejectWithValue }): Promise<any> => {
    try {
      await axios.put(`transactions/${id}`, transaction);

      dispatch(getTransactions());
      dispatch(getSummary());
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error);
    }
  });

export const deleteTransaction = createAsyncThunk<void, Transaction['id'], { rejectValue: ErrorResponse }>(
  'transactions/deleteTransaction',
  async (id, { dispatch, rejectWithValue }): Promise<any> => {
    try {
      await axios.delete(`transactions/${id}`);

      dispatch(getTransactions());
      dispatch(getSummary());
      dispatch(getAccounts());
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error);
    }
  });

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    resetCurrentTransaction(state): TransactionState {
      return {
        ...state,
        currentTransaction: initialState.currentTransaction,
        currentStatus: initialState.currentStatus
      };
    },
    resetTransactionStatus(state): TransactionState {
      return {
        ...state,
        status: initialState.status
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
          currentStatus: 'loading'
        };
      })
      .addCase(getTransaction.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): TransactionState => {
        return {
          ...state,
          currentStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(getTransaction.fulfilled, (state, action: PayloadAction<Transaction>): TransactionState => {
        return {
          ...state,
          currentTransaction: action.payload,
          currentStatus: 'succeeded'
        };
      })
      .addCase(addTransaction.pending, (state): TransactionState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(addTransaction.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): TransactionState => {
        return {
          ...state,
          error: action.payload,
          status: 'failed'
        };
      })
      .addCase(addTransaction.fulfilled, (state): TransactionState => {
        return {
          ...state,
          status: 'succeeded'
        };
      })
      .addCase(editTransaction.pending, (state): TransactionState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(editTransaction.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): TransactionState => {
        return {
          ...state,
          status: 'failed',
          error: action.payload
        };
      })
      .addCase(editTransaction.fulfilled, (state): TransactionState => {
        return {
          ...state,
          status: 'succeeded'
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

export const { resetCurrentTransaction, resetTransactionStatus } = transactionSlice.actions;
export default transactionSlice.reducer;
