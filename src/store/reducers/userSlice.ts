import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'store';
import { AuthState, UserState } from 'shared/models';
import { mapUser } from 'shared/helpers';

const initialState: UserState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
};

export const getUser = createAsyncThunk('user/setUserInfo', async (token: AuthState['token']) => {
  const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  });
  const user = response?.data;
  const mappedUser: UserState = { ...mapUser(user) };

  return mappedUser;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUser: () => initialState
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state) => ({
        ...state,
        loading: true
      }))
      .addCase(getUser.rejected, (state) => ({
        ...state,
        loading: false
      }))
      .addCase(getUser.fulfilled, (state, action: PayloadAction<UserState>) => ({
        ...state,
        ...action.payload,
        loading: false
      }));
  }
});

export const { removeUser } = userSlice.actions;

export const selectUser = (state: RootState): UserState => state.user;

export default userSlice.reducer;
