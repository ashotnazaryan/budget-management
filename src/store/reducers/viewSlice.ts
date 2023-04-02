import { createSlice } from '@reduxjs/toolkit';
import { ViewState } from 'shared/models';
import { RootState } from './rootReducer';

// TODO: move this to app slice
const initialState: ViewState = {
  sideBarOpened: false,
  loading: false
};

export const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    openSideBar: (state) => {
      state.sideBarOpened = true;
    },
    closeSidebar: (state) => {
      state.sideBarOpened = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading;
    }
  },
});

export const { openSideBar, closeSidebar, setLoading } = viewSlice.actions;

export const selectSideBarOpened = (state: RootState): ViewState['sideBarOpened'] => state.view.sideBarOpened;
export const selectLoading = (state: RootState): ViewState['loading'] => state.view.loading;

export default viewSlice.reducer;
