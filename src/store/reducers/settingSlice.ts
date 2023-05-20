import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'core/axios';
import date from 'core/date';
import { ErrorResponse, Period, Setting, SettingDTO, StatusState } from 'shared/models';
import { CURRENCIES, LOCALES } from 'shared/constants';
import { mapSettings } from 'shared/helpers';
import { RootState } from './rootReducer';
import { resetApp, setAppStatus } from './appSlice';
import { getBalance, resetSummaryStatus, setActivePeriodFilter } from './summarySlice';
import { resetTransactionStatus } from './transactionSlice';
import { resetAccountStatus } from './accountSlice';

export interface SettingState extends Setting {
  status: StatusState;
}

const isBrowserDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const initialState: SettingState = {
  defaultCurrency: CURRENCIES[0],
  defaultPeriod: Period.month,
  showDecimals: true,
  isDarkTheme: isBrowserDarkMode,
  locale: LOCALES[0],
  status: 'idle'
};

export const getSettings = createAsyncThunk<Setting, void, { rejectValue: ErrorResponse }>(
  'setting/getSettings',
  async (_, { dispatch, rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get<SettingDTO>('settings');

      dispatch(setAppStatus('succeeded'));
      dispatch(setActivePeriodFilter(data.defaultPeriod));
      date().setLocale(data.locale);

      return mapSettings(data);
    } catch (error: any) {
      dispatch(setAppStatus('succeeded'));
      return rejectWithValue(error);
    }
  });

export const addSetting = createAsyncThunk<void, [Partial<SettingDTO>, boolean?, boolean?], { rejectValue: ErrorResponse }>(
  'setting/addSetting',
  async ([setting, isAppLoading, shouldFetchAllData], { dispatch, rejectWithValue }) => {
    try {
      await axios.post<void>('settings/setting', setting);

      if (isAppLoading) {
        dispatch(setAppStatus('loading'));
      }

      await dispatch(getSettings());

      if (shouldFetchAllData) {
        dispatch(resetSummaryStatus());
        dispatch(resetTransactionStatus());
        dispatch(resetAccountStatus());
        dispatch(getBalance());
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSettings.pending, (state): SettingState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getSettings.rejected, (): SettingState => {
        return {
          ...initialState,
          status: 'failed'
        };
      })
      .addCase(getSettings.fulfilled, (state, action: PayloadAction<Setting>): SettingState => {
        return {
          ...state,
          ...action.payload,
          status: 'succeeded'
        };
      })
      .addCase(resetApp, (): SettingState => {
        return initialState;
      });
  }
});

export const selectCurrency = (state: RootState): SettingState['defaultCurrency'] => state.setting.defaultCurrency;
export const selectSettings = (state: RootState): SettingState => state.setting;

export default settingSlice.reducer;
