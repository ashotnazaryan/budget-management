import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    getSettings: jest.fn()
  },
});

export const selectSettings = jest.fn();

export const { getSettings } = settingSlice.actions;
export default settingSlice.reducer;
