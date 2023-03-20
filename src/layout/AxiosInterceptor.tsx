import * as React from 'react';
import axios, { AxiosError } from 'axios';
import { useAppDispatch } from 'store';
import { AUTH_KEY } from 'shared/constants';
import { getFromLocalStorage, removeFromLocalStorage } from 'shared/helpers';
import { AuthState } from 'shared/models';
import { logout, removeUser } from 'store/reducers';

const { accessToken } = getFromLocalStorage<AuthState>(AUTH_KEY);
axios.create({
  headers: {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json'
  }
});

const AxiosInterceptor: React.FC<{ children: React.ReactElement }> = ({ children }: { children: React.ReactElement }) => {
  const dispatch = useAppDispatch();

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        dispatch(removeUser());
        removeFromLocalStorage(AUTH_KEY);
        dispatch(logout());

        return Promise.reject(error);
      }
    }
  );

  return children;
};

export default AxiosInterceptor;
