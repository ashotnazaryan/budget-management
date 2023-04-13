import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Auth, AuthDTO, StatusState } from 'shared/models';
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from 'shared/helpers';
import { AUTH_KEY } from 'shared/constants';
import { resetApp } from './appSlice';
import { RootState } from './rootReducer';

export interface AuthState extends Auth {
  status: StatusState;
}

const initialState: AuthState = {
  status: 'idle',
  accessToken: '',
  refreshToken: '',
  userId: ''
};

export const getUserToken = createAsyncThunk('auth/getUserToken', async (): Promise<Auth> => {
  const response = await axios.get<Auth>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/auth/login/success`);

  const auth: Auth = {
    userId: response.data.userId,
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken
  };

  saveToLocalStorage(AUTH_KEY, auth);

  return auth;
});

export const getNewAccessToken = createAsyncThunk('auth/getNewAccessToken', async (refreshToken: Auth['refreshToken']): Promise<Auth> => {
  try {
    const response = await axios.post<AuthDTO>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/auth/access-token`, { refreshToken });
    const { userId } = getFromLocalStorage<Auth>(AUTH_KEY);

    if (response?.data) {
      const newAuth: Auth = {
        userId,
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token
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
  await axios.get<void>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/auth/logout`);

  removeFromLocalStorage(AUTH_KEY);
  dispatch(resetApp());
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
      .addCase(getUserToken.fulfilled, (state, action: PayloadAction<Auth>) => {
        return {
          ...state,
          ...action.payload,
          status: 'succeeded'
        };
      })
      .addCase(getNewAccessToken.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getNewAccessToken.rejected, (state) => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getNewAccessToken.fulfilled, (state, action: PayloadAction<Auth>) => {
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
      .addCase(logout.fulfilled, () => {
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
