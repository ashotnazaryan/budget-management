import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { ViewState } from 'shared/models';

const initialState: ViewState = {
  sideBarOpened: false
};

export const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    openSideBar: (state): void => {
      state.sideBarOpened = true;
    },
    closeSidebar: (state): void => {
      state.sideBarOpened = false;
    }
  },
});

export const { openSideBar, closeSidebar } = viewSlice.actions;

export const selectSideBarOpened = (state: RootState): ViewState['sideBarOpened'] => state.view.sideBarOpened;

export default viewSlice.reducer;
