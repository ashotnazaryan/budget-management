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
    const response = await axios.get<{ data: AccountDTO[] }>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/account/default-accounts`);

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
      });
  }
});

export const selectAccount = (state: RootState): AccountState => state.account;

export default AccountSlice.reducer;
