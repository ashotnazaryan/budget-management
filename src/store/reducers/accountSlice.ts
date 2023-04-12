import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { store } from 'store';
import { Account, AccountDTO, ErrorResponse, StatusState } from 'shared/models';
import { mapAccount, mapAccounts } from 'shared/helpers';
import { RootState } from './rootReducer';
import { resetApp } from './appSlice';
import { getSummary } from './summarySlice';

export interface AccountState {
  accounts: Account[];
  status: StatusState;
  currentAccount?: Account;
  error?: ErrorResponse;
}

const initialState: AccountState = {
  status: 'idle',
  accounts: []
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
        return mapAccount(response.data);
      }

      return {} as Account;
    } catch (error) {
      console.error(error);
      return {} as Account;
    }
  });

// TODO: create error mechanism for all axios requests
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
      }
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.error);
    }
  });

export const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    resetCurrentAccount(state) {
      return {
        ...state,
        currentAccount: undefined
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAccounts.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getAccounts.rejected, (state) => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getAccounts.fulfilled, (state, action) => {
        return {
          ...state,
          accounts: action.payload,
          status: 'succeeded'
        };
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        return {
          ...state,
          currentAccount: action.payload
        };
      })
      .addCase(createAccount.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(createAccount.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload
        };
      })
      .addCase(createAccount.fulfilled, (state) => {
        return {
          ...state,
          status: 'succeeded'
        };
      })
      .addCase(editAccount.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(editAccount.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload
        };
      })
      .addCase(editAccount.fulfilled, (state) => {
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

export const selectAccount = (state: RootState): AccountState => state.account;
export const selectAccountStatus = (state: RootState): AccountState['status'] => state.account.status;
export const selectCurrentAccount = (state: RootState): AccountState['currentAccount'] => state.account.currentAccount;

export const { resetCurrentAccount } = accountSlice.actions;
export default accountSlice.reducer;
