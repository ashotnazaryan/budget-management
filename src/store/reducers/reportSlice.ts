import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'core/axios';
import { store } from 'store';
import { ErrorResponse, StatusState, Report, ReportDTO } from 'shared/models';
import { mapReports } from 'shared/helpers';
import { RootState } from './rootReducer';
import { resetApp } from './appSlice';

export interface ReportState {
  reports: Report[];
  status: StatusState;
  error?: ErrorResponse;
}

const initialState: ReportState = {
  reports: [],
  status: 'idle'
};

export const getReports = createAsyncThunk<Report[], void, { rejectValue: ErrorResponse }>(
  'reports/getReports',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<ReportDTO[]>('reports');

      if (data) {
        const { showDecimals, locale: { isoIntl } } = store.getState().setting;

        return mapReports(data, isoIntl, showDecimals);
      }

      return [];
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    resetReportsStatus(state): ReportState {
      return {
        ...state,
        status: initialState.status
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getReports.pending, (state): ReportState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getReports.rejected, (state): ReportState => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getReports.fulfilled, (state, action: PayloadAction<Report[]>): ReportState => {
        return {
          ...state,
          reports: action.payload,
          status: 'succeeded'
        };
      })
      .addCase(resetApp, (): ReportState => {
        return initialState;
      });
  }
});

export const selectReport = (state: RootState): ReportState => state.report;

export const { resetReportsStatus } = reportSlice.actions;

export default reportSlice.reducer;
