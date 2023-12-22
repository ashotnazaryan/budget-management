import { combineReducers } from '@reduxjs/toolkit';
import summaryReducer from './summarySlice';
import transactionReducer from './transactionSlice';
import settingReducer from './settingSlice';
import categoryReducer from './categorySlice';
import accountReducer from './accountSlice';
import transferReducer from './transferSlice';
import invoiceReducer from './invoiceSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';
import profileReducer from './profileSlice';
import appReducer from './appSlice';

const rootReducer = combineReducers({
  summary: summaryReducer,
  transaction: transactionReducer,
  setting: settingReducer,
  category: categoryReducer,
  account: accountReducer,
  transfer: transferReducer,
  invoice: invoiceReducer,
  auth: authReducer,
  user: userReducer,
  profile: profileReducer,
  app: appReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
