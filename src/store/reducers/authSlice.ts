import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { AuthState } from 'shared/models';

const initialState: AuthState = {
  isLoggedIn: false,
  token: ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>): void => {
      state.isLoggedIn = !!action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    removeAuth: (state): void => {
      state.isLoggedIn = false;
    }
  }
});

export const { setAuth, removeAuth } = authSlice.actions;

export const selectAuth = (state: RootState): AuthState => state.auth;

export default authSlice.reducer;
