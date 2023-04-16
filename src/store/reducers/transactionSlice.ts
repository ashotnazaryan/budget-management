import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { store } from 'store';
import { ErrorResponse, StatusState, Transaction, TransactionDTO } from 'shared/models';
import { mapTransaction, mapTransactions } from 'shared/helpers';
import { RootState } from './rootReducer';
import { getSummary } from './summarySlice';
import { resetApp } from './appSlice';

export interface TransactionState {
  transactions: Transaction[];
  status: StatusState;
  currentTransaction?: Transaction;
  error?: ErrorResponse;
}

const initialState: TransactionState = {
  transactions: [],
  status: 'idle'
};

export const getTransactions = createAsyncThunk('transactions/getTransactions', async (): Promise<Transaction[]> => {
  try {
    const response = await axios.get<TransactionDTO[]>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/transactions`);

    if (response?.data) {
      const { showDecimals } = store.getState().setting;

      return mapTransactions(response.data, showDecimals);
    }

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
});

export const getTransaction = createAsyncThunk<Transaction, TransactionDTO['id'], { rejectValue: ErrorResponse }>(
  'transactions/getTransaction',
  async (id): Promise<Transaction> => {
    try {
      const response = await axios.get<TransactionDTO>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/transactions/${id}`);

      if (response?.data) {
        const { showDecimals } = store.getState().setting;

        return mapTransaction(response.data, showDecimals);
      }

      return {} as Transaction;
    } catch (error) {
      console.error(error);
      return {} as Transaction;
    }
  });

export const addTransaction = createAsyncThunk<void, TransactionDTO, { rejectValue: ErrorResponse }>(
  'transactions/addTransaction',
  async (transaction, { dispatch, rejectWithValue }): Promise<any> => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/transactions/transaction`, transaction);

      if (response?.data) {
        dispatch(getSummary());
        dispatch(getTransactions());
      }
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.error);
    }
  });

export const editTransaction = createAsyncThunk<void, [Transaction['id'], Omit<TransactionDTO, 'id'>], { rejectValue: ErrorResponse }>(
  'transactions/editTransaction',
  async ([id, transaction], { dispatch, rejectWithValue }): Promise<any> => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/transactions/${id}`, transaction);

      if (response?.data) {
        dispatch(getSummary());
        dispatch(getTransactions());
      }
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.error);
    }
  });

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    resetCurrentTransaction(state) {
      return {
        ...state,
        currentTransaction: undefined
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTransactions.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getTransactions.rejected, (state) => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        return {
          ...state,
          transactions: action.payload,
          status: 'succeeded'
        };
      })
      .addCase(getTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
        return {
          ...state,
          currentTransaction: action.payload
        };
      })
      .addCase(addTransaction.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(addTransaction.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
        return {
          ...state,
          error: action.payload,
          status: 'failed'
        };
      })
      .addCase(addTransaction.fulfilled, (state) => {
        return {
          ...state,
          status: 'succeeded'
        };
      })
      .addCase(editTransaction.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(editTransaction.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload
        };
      })
      .addCase(editTransaction.fulfilled, (state) => {
        return {
          ...state,
          status: 'succeeded'
        };
      })
      .addCase(resetApp, () => {
        return initialState;
      });
  }
});

export const selectTransaction = (state: RootState): TransactionState => state.transaction;
export const selectCurrentTransaction = (state: RootState): TransactionState['currentTransaction'] => state.transaction.currentTransaction;

export const { resetCurrentTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
