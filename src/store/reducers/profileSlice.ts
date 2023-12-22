import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'core/axios';
import { ErrorResponse, StatusState, UserProfile, UserProfileDTO } from 'shared/models';
import { mapProfile } from 'shared/helpers';
import { RootState } from './rootReducer';
import { resetApp } from './appSlice';

export interface ProfileState {
  userProfile: UserProfile;
  status: StatusState;
  editStatus: StatusState;
  error?: ErrorResponse;
}

const initialState: ProfileState = {
  userProfile: {} as UserProfile,
  status: 'idle',
  editStatus: 'idle'
};

export const getProfile = createAsyncThunk<UserProfile, void, { rejectValue: ErrorResponse }>(
  'profile/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<UserProfileDTO>('profile');

      if (data) {
        return mapProfile(data);
      }

      return {} as UserProfile;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const editProfile = createAsyncThunk<void, Omit<UserProfileDTO, 'id'>, { rejectValue: ErrorResponse }>(
  'profile/editProfile',
  async (profile, { dispatch, rejectWithValue }) => {
    try {
      await axios.put<void>('profile', profile);
      await dispatch(getProfile());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProfile.pending, (state): ProfileState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getProfile.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): ProfileState => {
        return {
          ...state,
          status: 'failed',
          error: action.payload
        };
      })
      .addCase(getProfile.fulfilled, (state, action: PayloadAction<UserProfile>): ProfileState => {
        return {
          ...state,
          userProfile: action.payload,
          status: 'succeeded'
        };
      })
      .addCase(editProfile.pending, (state): ProfileState => {
        return {
          ...state,
          editStatus: 'loading'
        };
      })
      .addCase(editProfile.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): ProfileState => {
        return {
          ...state,
          editStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(editProfile.fulfilled, (state): ProfileState => {
        return {
          ...state,
          editStatus: 'succeeded'
        };
      })
      .addCase(resetApp, (): ProfileState => {
        return initialState;
      });
  }
});

export const selectProfile = (state: RootState): ProfileState => state.profile;
export const selectProfileStatus = (state: RootState): ProfileState['status'] => state.profile.status;

export default profileSlice.reducer;
