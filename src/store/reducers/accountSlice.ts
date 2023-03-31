import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'store';
import { Account, AccountDTO, AccountState, ErrorResponse } from 'shared/models';
import { mapAccounts } from 'shared/helpers';

const initialState: AccountState = {
  status: 'idle',
  accounts: []
};

export const getAccounts = createAsyncThunk<Account[], void>('accounts/getAccounts', async (): Promise<Account[]> => {
  try {
    const response = await axios.get<AccountDTO[]>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/accounts`);

    if (response?.data) {
      return mapAccounts(response.data);
    }

    return [];
  } catch (error) {
    console.error(error);
    return [];
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
      }
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.error);
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
      .addCase(getAccounts.fulfilled, (state, action) => {
        return {
          ...state,
          accounts: action.payload,
          status: 'succeeded'
        };
      })
      .addCase(createAccount.pending, (state) => {
        return {
          ...state,
          status: 'loading',
          newAccountStatus: 'loading'
        };
      })
      .addCase(createAccount.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          newAccountStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(createAccount.fulfilled, (state) => {
        return {
          ...state,
          status: 'succeeded',
          newAccountStatus: 'succeeded'
        };
      });
  }
});

export const selectAccount = (state: RootState): AccountState => state.account;

export default AccountSlice.reducer;
