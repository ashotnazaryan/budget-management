import axios from 'axios';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
  async (_, { rejectWithValue }): Promise<any> => {
    try {
      const response = await axios.get<UserDTO>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/user`);

      if (response?.data) {
        return mapUser(response.data);
      }

      return initialState;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.error);
    }
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
      .addCase(getUserInfo.fulfilled, (state, action: PayloadAction<User>) => {
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
