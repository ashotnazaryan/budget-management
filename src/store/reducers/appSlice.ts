import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import { ErrorResponse, StatusState } from 'shared/models';

interface AppState {
  status: StatusState;
  error?: ErrorResponse;
}

const initialState: AppState = {
  status: 'idle'
};

export const eraseUserData = createAsyncThunk<void, string, { rejectValue: ErrorResponse }>(
  'app/eraseUserData',
  async (userId, { dispatch, rejectWithValue }): Promise<any> => {
    try {
      await axios.delete(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/settings/${userId}/delete-all`);

      dispatch(resetApp());
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.error);
    }
  });

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    resetApp(state) {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(eraseUserData.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(eraseUserData.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          status: 'failed'
        };
      })
      .addCase(eraseUserData.fulfilled, (state) => {
        return {
          ...initialState,
          status: 'succeeded'
        };
      });
  },
});

export const selectApp = (state: RootState): AppState => state.app;

export const { resetApp } = appSlice.actions;
export default appSlice.reducer;
