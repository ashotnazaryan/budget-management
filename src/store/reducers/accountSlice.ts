import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'core/axios';
import { store } from 'store';
import { Account, AccountDTO, ErrorResponse, StatusState } from 'shared/models';
import { mapAccount, mapAccounts } from 'shared/helpers';
import { RootState } from './rootReducer';
import { resetApp } from './appSlice';
import { resetSummaryStatus } from './summarySlice';
import { resetTransactionsStatus } from './transactionSlice';
import { resetTransfersStatus } from './transferSlice';

export interface AccountState {
  accounts: Account[];
  status: StatusState;
  getStatus: StatusState;
  createEditStatus: StatusState;
  deleteStatus: StatusState;
  currentAccount?: Account;
  error?: ErrorResponse;
}

const initialState: AccountState = {
  accounts: [],
  status: 'idle',
  getStatus: 'idle',
  createEditStatus: 'idle',
  deleteStatus: 'idle'
};

export const getAccounts = createAsyncThunk<Account[], void, { rejectValue: ErrorResponse }>(
  'accounts/getAccounts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<AccountDTO[]>('accounts');

      if (data) {
        const { showDecimals, locale: { isoIntl } } = store.getState().setting;

        return mapAccounts(data, isoIntl, showDecimals);
      }

      return [];
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const getAccount = createAsyncThunk<Account, AccountDTO['id'], { rejectValue: ErrorResponse }>(
  'accounts/getAccount',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<AccountDTO>(`accounts/${id}`);

      if (data) {
        const { showDecimals, locale: { isoIntl } } = store.getState().setting;

        return mapAccount(data, isoIntl, showDecimals);
      }

      return {} as Account;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const createAccount = createAsyncThunk<void, AccountDTO, { rejectValue: ErrorResponse }>(
  'accounts/createAccount',
  async (account, { dispatch, rejectWithValue }) => {
    try {
      await axios.post<void>('accounts/account', account);

      dispatch(resetAccountsStatus());
      dispatch(resetSummaryStatus());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const editAccount = createAsyncThunk<void, [Account['id'], Omit<AccountDTO, 'id'>], { rejectValue: ErrorResponse }>(
  'accounts/editAccount',
  async ([id, account], { dispatch, rejectWithValue }) => {
    try {
      await axios.put<void>(`accounts/${id}`, account);

      dispatch(resetAccountsStatus());
      dispatch(resetSummaryStatus());
      dispatch(resetTransactionsStatus());
      dispatch(resetTransfersStatus());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const deleteAccount = createAsyncThunk<void, Account['id'], { rejectValue: ErrorResponse }>(
  'accounts/deleteAccount',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete<void>(`accounts/${id}`);

      dispatch(resetAccountsStatus());
      dispatch(resetSummaryStatus());
      dispatch(resetTransactionsStatus());
      dispatch(resetTransfersStatus());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    resetAccountsStatus(state): AccountState {
      return {
        ...state,
        status: initialState.status
      };
    },
    resetGetAccountStatus(state): AccountState {
      return {
        ...state,
        currentAccount: initialState.currentAccount,
        getStatus: initialState.getStatus
      };
    },
    setGetAccountErrorStatus(state): AccountState {
      return {
        ...state,
        getStatus: 'failed'
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
          getStatus: 'loading'
        };
      })
      .addCase(getAccount.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): AccountState => {
        return {
          ...state,
          getStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(getAccount.fulfilled, (state, action: PayloadAction<Account>): AccountState => {
        return {
          ...state,
          currentAccount: action.payload,
          getStatus: 'succeeded'
        };
      })
      .addCase(createAccount.pending, (state): AccountState => {
        return {
          ...state,
          createEditStatus: 'loading'
        };
      })
      .addCase(createAccount.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): AccountState => {
        return {
          ...state,
          createEditStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(createAccount.fulfilled, (state): AccountState => {
        return {
          ...state,
          createEditStatus: 'succeeded'
        };
      })
      .addCase(editAccount.pending, (state): AccountState => {
        return {
          ...state,
          createEditStatus: 'loading'
        };
      })
      .addCase(editAccount.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): AccountState => {
        return {
          ...state,
          createEditStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(editAccount.fulfilled, (state): AccountState => {
        return {
          ...state,
          createEditStatus: 'succeeded'
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

export const { resetGetAccountStatus, resetAccountsStatus, setGetAccountErrorStatus } = accountSlice.actions;
export default accountSlice.reducer;
