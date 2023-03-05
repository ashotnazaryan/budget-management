import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { AuthState } from 'shared/models';

const initialState: AuthState = {
  isLoggedIn: false,
  token: '',
  status: 'idle'
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      return {
        ...state,
        ...action.payload,
        status: 'succeeded'
      };
    },
    removeAuth: () => {
      return initialState;
    }
  }
});

export const { setAuth, removeAuth } = authSlice.actions;

export const selectAuth = (state: RootState): AuthState => state.auth;
export const selectAuthStatus = (state: RootState): AuthState['status'] => state.auth.status;

export default authSlice.reducer;
