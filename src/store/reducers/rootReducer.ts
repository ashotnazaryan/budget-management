import { combineReducers } from '@reduxjs/toolkit';
import summaryReducer from './summarySlice';
import transactionReducer from './transactionSlice';
import settingReducer from './settingSlice';
import categoryReducer from './categorySlice';
import accountReducer from './accountSlice';
import transferReducer from './transferSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';
import appReducer from './appSlice';

const rootReducer = combineReducers({
  summary: summaryReducer,
  transaction: transactionReducer,
  setting: settingReducer,
  category: categoryReducer,
  account: accountReducer,
  transfer: transferReducer,
  auth: authReducer,
  user: userReducer,
  app: appReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
