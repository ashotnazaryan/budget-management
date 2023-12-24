import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'core/axios';
import { ErrorResponse, StatusState } from 'shared/models';
import { RootState } from './rootReducer';

interface AppState {
  status: StatusState;
  sideBarOpened: boolean;
  error?: ErrorResponse;
}

const initialState: AppState = {
  sideBarOpened: false,
  status: 'idle'
};

export const reset = createAsyncThunk<void, string, { rejectValue: ErrorResponse }>(
  'app/reset',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete<void>('settings/reset');

      dispatch(resetApp());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    resetApp(): AppState {
      return initialState;
    },
    openSideBar: (state): AppState => {
      return {
        ...state,
        sideBarOpened: true
      };
    },
    closeSidebar: (state): AppState => {
      return {
        ...state,
        sideBarOpened: false
      };
    },
    setAppStatus: (state, action: PayloadAction<StatusState>): AppState => {
      return {
        ...state,
        status: action.payload
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(reset.pending, (state): AppState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(reset.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): AppState => {
        return {
          ...state,
          error: action.payload,
          status: 'failed'
        };
      })
      .addCase(reset.fulfilled, (): AppState => {
        return {
          ...initialState,
          status: 'succeeded'
        };
      });
  },
});

export const selectApp = (state: RootState): AppState => state.app;

export const { resetApp, setAppStatus, openSideBar, closeSidebar } = appSlice.actions;
export default appSlice.reducer;
