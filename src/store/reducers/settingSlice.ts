import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'store';
import { Setting, SettingDTO, SettingState } from 'shared/models';

const initialState: SettingState = {
  currency: {
    iso: 'USD',
    name: 'US Dollar',
    symbol: '$'
  },
  showDecimals: false,
  status: 'idle'
};

export const getSettings = createAsyncThunk('setting/getSettings', async (): Promise<Setting> => {
  try {
    const response = await axios.get<{ data: SettingDTO }>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/settings`);

    const { data } = response.data;

    return data;
  } catch (error) {
    console.error(error);
    return {} as Setting;
  }
});

export const addSetting = createAsyncThunk('setting/addSetting', async (setting: Partial<Setting>, { dispatch }): Promise<void> => {
  try {
    await axios.post<void>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/settings/setting`, setting);
    dispatch(getSettings());
  } catch (error) {
    console.error(error);
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
      .addCase(getSettings.rejected, (state) => {
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
      });
  }
});

export const selectCurrency = (state: RootState): SettingState['currency'] => state.setting.currency;
export const selectSettings = (state: RootState): SettingState => state.setting;

export default settingSlice.reducer;
