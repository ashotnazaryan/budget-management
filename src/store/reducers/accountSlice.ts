import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { store } from 'store';
import { Account, AccountDTO, ErrorResponse, StatusState } from 'shared/models';
import { mapAccount, mapAccounts } from 'shared/helpers';
import { RootState } from './rootReducer';
import { resetApp } from './appSlice';
import { getSummary } from './summarySlice';
import { getTransactions } from './transactionSlice';

export interface AccountState {
  accounts: Account[];
  status: StatusState;
  deleteStatus: StatusState;
  currentStatus: StatusState;
  currentAccount?: Account;
  error?: ErrorResponse;
}

const initialState: AccountState = {
  accounts: [],
  status: 'idle',
  currentStatus: 'idle',
  deleteStatus: 'idle'
};

export const getAccounts = createAsyncThunk<Account[], void>('accounts/getAccounts', async (): Promise<Account[]> => {
  try {
    const response = await axios.get<AccountDTO[]>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/accounts`);

    if (response?.data) {
      const { showDecimals } = store.getState().setting;

      return mapAccounts(response.data, showDecimals);
    }

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
});

export const getAccount = createAsyncThunk<Account, AccountDTO['id'], { rejectValue: ErrorResponse }>(
  'accounts/getAccount',
  async (id): Promise<Account> => {
    try {
      const response = await axios.get<AccountDTO>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/accounts/${id}`);

      if (response?.data) {
        const { showDecimals } = store.getState().setting;

        return mapAccount(response.data, showDecimals);
      }

      return {} as Account;
    } catch (error) {
      console.error(error);
      return {} as Account;
    }
  });

export const createAccount = createAsyncThunk<void, AccountDTO, { rejectValue: ErrorResponse }>(
  'accounts/createAccount',
  async (account, { dispatch, rejectWithValue }): Promise<any> => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/accounts/account`, account);

      if (response?.data) {
        dispatch(getAccounts());
        dispatch(getSummary());
      }
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.error);
    }
  });

export const editAccount = createAsyncThunk<void, [Account['id'], Omit<AccountDTO, 'id'>], { rejectValue: ErrorResponse }>(
  'accounts/editAccount',
  async ([id, account], { dispatch, rejectWithValue }): Promise<any> => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/accounts/${id}`, account);

      if (response?.data) {
        dispatch(getAccounts());
        dispatch(getSummary());
        dispatch(getTransactions());
      }
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.error);
    }
  });

export const deleteAccount = createAsyncThunk<void, Account['id'], { rejectValue: ErrorResponse }>(
  'accounts/deleteAccount',
  async (id, { dispatch, rejectWithValue }): Promise<any> => {
    try {
      await axios.delete(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/accounts/${id}`);

      dispatch(getAccounts());
      dispatch(getSummary());
      dispatch(getTransactions());
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.error);
    }
  });

export const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    resetCurrentAccount(state): AccountState {
      return {
        ...state,
        currentAccount: initialState.currentAccount,
        currentStatus: initialState.currentStatus
      };
    },
    resetAccountStatus(state): AccountState {
      return {
        ...state,
        status: initialState.status
      };
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAccounts.pending, (state): AccountState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getAccounts.rejected, (state): AccountState => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getAccounts.fulfilled, (state, action: PayloadAction<Account[]>): AccountState => {
        return {
          ...state,
          accounts: action.payload,
          status: 'succeeded'
        };
      })
      .addCase(getAccount.pending, (state): AccountState => {
        return {
          ...state,
          currentStatus: 'loading'
        };
      })
      .addCase(getAccount.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): AccountState => {
        return {
          ...state,
          currentStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(getAccount.fulfilled, (state, action: PayloadAction<Account>): AccountState => {
        return {
          ...state,
          currentAccount: action.payload,
          currentStatus: 'succeeded'
        };
      })
      .addCase(createAccount.pending, (state): AccountState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(createAccount.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): AccountState => {
        return {
          ...state,
          status: 'failed',
          error: action.payload
        };
      })
      .addCase(createAccount.fulfilled, (state): AccountState => {
        return {
          ...state,
          status: 'succeeded'
        };
      })
      .addCase(editAccount.pending, (state): AccountState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(editAccount.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): AccountState => {
        return {
          ...state,
          status: 'failed',
          error: action.payload
        };
      })
      .addCase(editAccount.fulfilled, (state): AccountState => {
        return {
          ...state,
          status: 'succeeded'
        };
      })
      .addCase(deleteAccount.pending, (state): AccountState => {
        return {
          ...state,
          deleteStatus: 'loading'
        };
      })
      .addCase(deleteAccount.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): AccountState => {
        return {
          ...state,
          deleteStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(deleteAccount.fulfilled, (state): AccountState => {
        return {
          ...state,
          deleteStatus: 'succeeded'
        };
      })
      .addCase(resetApp, (): AccountState => {
        return initialState;
      });
  }
});

export const selectAccount = (state: RootState): AccountState => state.account;
export const selectAccountStatus = (state: RootState): AccountState['status'] => state.account.status;
export const selectAccountError = (state: RootState): AccountState['error'] => state.account.error;
export const selectCurrentAccount = (state: RootState): AccountState['currentAccount'] => state.account.currentAccount;

export const { resetCurrentAccount, resetAccountStatus } = accountSlice.actions;
export default accountSlice.reducer;
