import { configureStore, AnyAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import rootReducer, { RootState } from './reducers/rootReducer';

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = configureStore({
  reducer: rootReducer
});
