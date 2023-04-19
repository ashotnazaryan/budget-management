import axios from 'axios';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import { ErrorResponse, StatusState } from 'shared/models';

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
  async (userId, { dispatch, rejectWithValue }): Promise<any> => {
    try {
      await axios.delete(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/settings/${userId}/reset`);

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
    openSideBar: (state) => {
      return {
        ...state,
        sideBarOpened: true
      };
    },
    closeSidebar: (state) => {
      return {
        ...state,
        sideBarOpened: false
      };
    },
    setAppStatus: (state, action: PayloadAction<StatusState>) => {
      return {
        ...state,
        status: action.payload
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(reset.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(reset.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
        return {
          ...state,
          error: action.payload,
          status: 'failed'
        };
      })
      .addCase(reset.fulfilled, () => {
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
