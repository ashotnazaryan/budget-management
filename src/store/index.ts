import { configureStore, AnyAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import summaryReducer from './reducers/summarySlice';
import transactionReducer from './reducers/transactionSlice';
import currencyReducer from './reducers/currencySlice';
import authReducer from './reducers/authSlice';
import userReducer from './reducers/userSlice';
import categoryReducer from './reducers/categorySlice';
import viewReducer from './reducers/viewSlice';

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = configureStore({
  reducer: {
    summary: summaryReducer,
    transaction: transactionReducer,
    currency: currencyReducer,
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    view: viewReducer
  }
});
