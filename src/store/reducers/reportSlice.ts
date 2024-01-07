import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'core/axios';
import { store } from 'store';
import { ErrorResponse, StatusState, Report, ReportDTO, ReportItem } from 'shared/models';
import { mapReport } from 'shared/helpers';
import { RootState } from './rootReducer';
import { resetApp } from './appSlice';

export interface ReportState {
  report: Report;
  status: StatusState;
  error?: ErrorResponse;
}

const initialState: ReportState = {
  report: {
    reports: [] as ReportItem[]
  } as Report,
  status: 'idle'
};

export const getReport = createAsyncThunk<Report, void, { rejectValue: ErrorResponse }>(
  'reports/getReport',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<ReportDTO>('reports');

      if (data.id) {
        const { showDecimals, locale: { isoIntl } } = store.getState().setting;

        return mapReport(data, isoIntl, showDecimals);
      }

      return initialState.report;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    resetReportStatus(state): ReportState {
      return {
        ...state,
        status: initialState.status
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getReport.pending, (state): ReportState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getReport.rejected, (state): ReportState => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getReport.fulfilled, (state, action: PayloadAction<Report>): ReportState => {
        return {
          ...state,
          report: action.payload,
          status: 'succeeded'
        };
      })
      .addCase(resetApp, (): ReportState => {
        return initialState;
      });
  }
});

export const selectReport = (state: RootState): ReportState => state.report;

export const { resetReportStatus } = reportSlice.actions;

export default reportSlice.reducer;
