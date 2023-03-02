import { configureStore, AnyAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import authReducer from './reducers/authSlice';
import summaryReducer from './reducers/summarySlice';
import currencyReducer from './reducers/currencySlice';
import userReducer from './reducers/userSlice';
import viewReducer from './reducers/viewSlice';

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    summary: summaryReducer,
    currency: currencyReducer,
    user: userReducer,
    view: viewReducer
  }
});
