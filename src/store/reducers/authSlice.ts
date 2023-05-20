import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'core/axios';
import { Auth, AuthDTO, ErrorResponse, StatusState } from 'shared/models';
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

export const getUserToken = createAsyncThunk<Auth, void, { rejectValue: ErrorResponse }>(
  'auth/getUserToken',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<Auth>('auth/login/success');

      const auth: Auth = {
        userId: data.userId,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      };

      saveToLocalStorage(AUTH_KEY, auth);

      return auth;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getNewAccessToken = createAsyncThunk<Auth, Auth['refreshToken'], { rejectValue: ErrorResponse }>(
  'auth/getNewAccessToken', async (refreshToken: Auth['refreshToken'], { rejectWithValue }) => {
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
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const logout = createAsyncThunk<void, void, { rejectValue: ErrorResponse }>(
  'auth/logout', async (_, { dispatch, rejectWithValue }) => {
    try {
      await axios.get<void>('auth/logout');

      removeFromLocalStorage(AUTH_KEY);
      dispatch(resetApp());
    } catch (error: any) {
      return rejectWithValue(error);
    }
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
