import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './rootReducer';
import { AuthState, Auth } from 'shared/models';
import { removeFromLocalStorage, saveToLocalStorage } from 'shared/helpers';
import { AUTH_KEY } from 'shared/constants';
import { closeSidebar } from './viewSlice';

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

// export const getNewAccessToken = createAsyncThunk('auth/getNewAccessToken', async (refreshToken: Auth['refreshToken']): Promise<Auth> => {
//   const { data } = await axios.post<{ data: AuthDTO }>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/auth/access-token`, { refreshToken });
//   const { userId } = store.getState().auth;

//   const newAuth: Auth = {
//     userId,
//     accessToken: data.data.access_token,
//     refreshToken: data.data.refresh_token
//   };

//   saveToLocalStorage(AUTH_KEY, newAuth);

//   return newAuth;
// });

export const logout = createAsyncThunk('auth/logout', async (param, { dispatch }): Promise<void> => {
  await axios.get<void>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/auth/logout`);

  removeFromLocalStorage(AUTH_KEY);
  dispatch(closeSidebar());
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
      .addCase(getUserToken.fulfilled, (state, action) => {
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
      .addCase(logout.fulfilled, (state, action) => {
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
