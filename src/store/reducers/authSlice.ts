import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'core/axios';
import { Auth, AuthDTO, StatusState } from 'shared/models';
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from 'shared/helpers';
import { AUTH_KEY } from 'shared/constants';
import { resetApp } from './appSlice';
import { RootState } from './rootReducer';

export interface AuthState extends Auth {
  status: StatusState;
}

const initialState: AuthState = {
  accessToken: '',
  refreshToken: '',
  userId: '',
  status: 'idle'
};

export const getUserToken = createAsyncThunk('auth/getUserToken', async (): Promise<Auth> => {
  const { data } = await axios.get<Auth>('auth/login/success');

  const auth: Auth = {
    userId: data.userId,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken
  };

  saveToLocalStorage(AUTH_KEY, auth);

  return auth;
});

export const getNewAccessToken = createAsyncThunk('auth/getNewAccessToken', async (refreshToken: Auth['refreshToken']): Promise<Auth> => {
  try {
    const { data } = await axios.post<AuthDTO>('auth/access-token', { refreshToken });
    const { userId } = getFromLocalStorage<Auth>(AUTH_KEY);

    if (data) {
      const newAuth: Auth = {
        userId,
        accessToken: data.access_token,
        refreshToken: data.refresh_token
      };

      saveToLocalStorage(AUTH_KEY, newAuth);

      return newAuth;
    }

    return {} as Auth;
  } catch (error) {
    console.error(error);
    return {} as Auth;
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }): Promise<void> => {
  await axios.get<void>('auth/logout');

  removeFromLocalStorage(AUTH_KEY);
  dispatch(resetApp());
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeAuth: (): AuthState => {
      return initialState;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getUserToken.pending, (state): AuthState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getUserToken.rejected, (state): AuthState => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getUserToken.fulfilled, (state, action: PayloadAction<Auth>): AuthState => {
        return {
          ...state,
          ...action.payload,
          status: 'succeeded'
        };
      })
      .addCase(getNewAccessToken.pending, (state): AuthState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getNewAccessToken.rejected, (state): AuthState => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getNewAccessToken.fulfilled, (state, action: PayloadAction<Auth>): AuthState => {
        return {
          ...state,
          ...action.payload,
          status: 'succeeded'
        };
      })
      .addCase(logout.pending, (state): AuthState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(logout.rejected, (state): AuthState => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(logout.fulfilled, (): AuthState => {
        return {
          ...initialState,
          status: 'succeeded'
        };
      });
  }
});

export const selectAuth = (state: RootState): AuthState => state.auth;

export const { removeAuth } = authSlice.actions;
export default authSlice.reducer;
