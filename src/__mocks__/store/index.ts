import { AnyAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'store/reducers/rootReducer';

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export const useAppDispatch = jest.fn() as jest.Mock<TypedDispatch<RootState>>;
export const useAppSelector = jest.fn((selectorFn) => selectorFn({} as TypedUseSelectorHook<RootState>));

export const store = {
  dispatch: jest.fn(),
};
