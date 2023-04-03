import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { store } from 'store';
import { Account, AccountDTO, ErrorResponse, StatusState } from 'shared/models';
import { mapAccounts } from 'shared/helpers';
import { resetApp } from './appSlice';
import { RootState } from './rootReducer';

export interface AccountState {
  accounts: Account[];
  status: StatusState;
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

export const accountSlice = createSlice({
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
      .addCase(resetApp, () => {
        return initialState;
      });
  }
});

export const selectAccount = (state: RootState): AccountState => state.account;

export default accountSlice.reducer;
