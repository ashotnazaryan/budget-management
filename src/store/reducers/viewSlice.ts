import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';

export interface ViewState {
  sideBarOpened: boolean;
  loading: boolean;
}

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

export const selectSideBarOpened = (state: RootState): ViewState['sideBarOpened'] => state.view.sideBarOpened;
export const selectLoading = (state: RootState): ViewState['loading'] => state.view.loading;

export const { openSideBar, closeSidebar, setLoading } = viewSlice.actions;
export default viewSlice.reducer;
