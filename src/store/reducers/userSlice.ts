import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'core/axios';
import { ErrorResponse, StatusState, User, UserDTO } from 'shared/models';
import { mapUser } from 'shared/helpers';
import { RootState } from './rootReducer';

export interface UserState extends User {
  status: StatusState;
}

const initialState: UserState = {
  id: '',
  userId: '',
  fullName: '',
  avatar: '',
  status: 'idle',
};

export const getUserInfo = createAsyncThunk<User, void, { rejectValue: ErrorResponse }>(
  'user/getUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<UserDTO>('user');

      if (data) {
        return mapUser(data);
      }

      return initialState;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUser: (): UserState => {
      return initialState;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getUserInfo.pending, (state): UserState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getUserInfo.rejected, (state): UserState => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getUserInfo.fulfilled, (state, action: PayloadAction<User>): UserState => {
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
