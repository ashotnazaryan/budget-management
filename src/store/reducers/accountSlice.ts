import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'store';
import { Account, AccountDTO, AccountState } from 'shared/models';
import { mapAccounts } from 'shared/helpers';

const initialState: AccountState = {
  status: 'idle',
  accounts: []
};

export const getAccounts = createAsyncThunk('accounts/getAccounts', async (): Promise<Account[]> => {
  try {
    const response = await axios.get<{ data: AccountDTO[] }>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/accounts`);

    if (response?.data) {
      const { data } = response.data;

      return mapAccounts(data);
    }

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
});

export const createAccount = createAsyncThunk('accounts/createAccount', async (transaction: AccountDTO, { dispatch }): Promise<void> => {
  try {
    await axios.post<void>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/accounts/account`, transaction);
    dispatch(getAccounts());
  } catch (error) {
    console.error(error);
  }
});

export const AccountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
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
      .addCase(getAccounts.fulfilled, (state, action: PayloadAction<Account[]>) => {
        return {
          ...state,
          accounts: action.payload,
          status: 'succeeded'
        };
      })
      .addCase(createAccount.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(createAccount.rejected, (state) => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(createAccount.fulfilled, (state) => {
        return {
          ...state,
          status: 'succeeded'
        };
      });
  }
});

export const selectAccount = (state: RootState): AccountState => state.account;

export default AccountSlice.reducer;
