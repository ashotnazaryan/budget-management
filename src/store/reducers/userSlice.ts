import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Auth, StatusState, User, UserDTO } from 'shared/models';
import { mapUser } from 'shared/helpers';
import { RootState } from './rootReducer';

export interface UserState extends User {
  status: StatusState;
}

const initialState: UserState = {
  status: 'idle',
  id: '',
  firstName: '',
  lastName: '',
  fullName: '',
  avatar: '',
  email: '',
};

export const getUserInfo = createAsyncThunk('user/getUserInfo', async (token: Auth['accessToken']): Promise<User> => {
  const response = await axios.get<UserDTO>(`${process.env.REACT_APP_GOOGLE_OAUTH_BASE_URL}userinfo?access_token=${token}`);

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
      .addCase(getUserInfo.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          status: 'succeeded'
        };
      });
  }
});

export const selectUser = (state: RootState): UserState => state.user;

export const { removeUser } = userSlice.actions;
export default userSlice.reducer;
