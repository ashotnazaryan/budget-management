import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'store';
import { AuthState, UserState } from 'shared/models';
import { mapUser } from 'shared/helpers';

const initialState: UserState = {
  status: 'idle',
  id: '',
  firstName: '',
  lastName: '',
  email: '',
};

export const getUserInfo = createAsyncThunk('user/getUserInfo', async (token: AuthState['token']): Promise<UserState> => {
  const response = await axios.get(`${process.env.REACT_APP_GOOGLE_OAUTH_BASE_URL}userinfo?access_token=${token}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  });

  return mapUser(response?.data);
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUser: () => {
      return initialState;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getUserInfo.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getUserInfo.rejected, (state) => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getUserInfo.fulfilled, (state, action: PayloadAction<UserState>) => {
        return {
          ...state,
          ...action.payload,
          status: 'succeeded'
        };
      });
  }
});

export const { removeUser } = userSlice.actions;

export const selectUser = (state: RootState): UserState => state.user;
export const selectUserStatus = (state: RootState): UserState['status'] => state.user.status;

export default userSlice.reducer;
