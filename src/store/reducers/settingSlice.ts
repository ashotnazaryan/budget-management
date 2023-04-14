import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ErrorResponse, Setting, SettingDTO, StatusState } from 'shared/models';
import { CURRENCIES, LANGUAGES } from 'shared/constants';
import { mapSettings } from 'shared/helpers';
import { RootState } from './rootReducer';
import { resetApp, setAppStatus } from './appSlice';
import { getBalance, getSummary } from './summarySlice';
import { getTransactions } from './transactionSlice';
import { getAccounts } from './accountSlice';

export interface SettingState extends Setting {
  status: StatusState;
}

const initialState: SettingState = {
  defaultCurrency: CURRENCIES[0],
  showDecimals: false,
  isDarkTheme: false,
  language: LANGUAGES[0],
  status: 'idle'
};

export const getSettings = createAsyncThunk('setting/getSettings', async (_, { dispatch }): Promise<Setting> => {
  try {
    const response = await axios.get<SettingDTO>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/settings`);

    dispatch(setAppStatus('succeeded'));

    return mapSettings(response?.data);
  } catch (error) {
    console.error(error);
    dispatch(setAppStatus('succeeded'));
    return {} as Setting;
  }
});

export const addSetting = createAsyncThunk<void, [Partial<SettingDTO>, boolean?, boolean?], { rejectValue: ErrorResponse }>(
  'setting/addSetting',
  async ([setting, isAppLoading, shouldFetchAllData], { dispatch, rejectWithValue }): Promise<any> => {
    try {
      await axios.post<void>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/settings/setting`, setting);
      dispatch(getSettings());

      if (shouldFetchAllData) {
        dispatch(getSummary());
        dispatch(getTransactions());
        dispatch(getAccounts());
        dispatch(getBalance());
      }

      if (isAppLoading) {
        dispatch(setAppStatus('loading'));
      }
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.error);
    }
  });

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSettings.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getSettings.rejected, () => {
        return {
          ...initialState,
          status: 'failed'
        };
      })
      .addCase(getSettings.fulfilled, (state, action: PayloadAction<Setting>) => {
        return {
          ...state,
          ...action.payload,
          status: 'succeeded'
        };
      })
      .addCase(resetApp, () => {
        return initialState;
      });
  }
});

export const selectCurrency = (state: RootState): SettingState['defaultCurrency'] => state.setting.defaultCurrency;
export const selectSettings = (state: RootState): SettingState => state.setting;

export default settingSlice.reducer;
