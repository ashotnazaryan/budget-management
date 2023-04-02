import { combineReducers } from '@reduxjs/toolkit';
import summaryReducer from './summarySlice';
import transactionReducer from './transactionSlice';
import settingReducer from './settingSlice';
import categoryReducer from './categorySlice';
import accountReducer from './accountSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';
import viewReducer from './viewSlice';
import appReducer from './appSlice';

const rootReducer = combineReducers({
  summary: summaryReducer,
  transaction: transactionReducer,
  setting: settingReducer,
  category: categoryReducer,
  account: accountReducer,
  auth: authReducer,
  user: userReducer,
  view: viewReducer,
  app: appReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
