import { configureStore } from '@reduxjs/toolkit';
import summaryReducer from './reducers/summarySlice';
import currencyReducer from './reducers/currencySlice';

export const store = configureStore({
  reducer: {
    summary: summaryReducer,
    currency: currencyReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
