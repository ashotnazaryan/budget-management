import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    resetApp: jest.fn(),
    openSideBar: jest.fn(),
    closeSidebar: jest.fn(),
    setAppStatus: jest.fn(),
  },
});

export const selectApp = jest.fn();

export const { resetApp, setAppStatus, openSideBar, closeSidebar } = appSlice.actions;
export default appSlice.reducer;
