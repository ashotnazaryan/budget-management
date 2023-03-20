import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'store';
import { AuthState } from 'shared/models';
import { removeFromLocalStorage, saveToLocalStorage } from 'shared/helpers';
import { AUTH_KEY } from 'shared/constants';

const initialState: AuthState = {
  status: 'idle',
  accessToken: '',
  userId: ''
};

export const getUserToken = createAsyncThunk('auth/getUserToken', async (): Promise<AuthState> => {
  const response = await axios.get(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/auth/login/success`, {
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true
    }
  });

  const auth: AuthState = { userId: response.data.data.userId, accessToken: response.data.data.accessToken };

  saveToLocalStorage(AUTH_KEY, auth);

  return auth;
});

export const logout = createAsyncThunk('auth/logout', async (): Promise<AuthState> => {
  const response = await axios.get(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/auth/logout`, {
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true
    }
  });

  removeFromLocalStorage(AUTH_KEY);

  return response.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeAuth: () => {
      return initialState;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getUserToken.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getUserToken.rejected, (state) => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getUserToken.fulfilled, (state, action: PayloadAction<AuthState>) => {
        return {
          ...state,
          ...action.payload,
          status: 'succeeded'
        };
      })
      .addCase(logout.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(logout.rejected, (state) => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(logout.fulfilled, (state, action: PayloadAction<AuthState>) => {
        return {
          ...state,
          ...action.payload,
          status: 'succeeded'
        };
      });
  }
});

export const { removeAuth } = authSlice.actions;

export const selectAuth = (state: RootState): AuthState => state.auth;

export default authSlice.reducer;
