import * as React from 'react';
import axios, { AxiosError, CreateAxiosDefaults } from 'axios';
import { useAppDispatch } from 'store';
import { AUTH_KEY } from 'shared/constants';
import { getFromLocalStorage, removeFromLocalStorage } from 'shared/helpers';
import { AuthState } from 'shared/models';
import { logout, removeUser } from 'store/reducers';

const defaultConfigs: CreateAxiosDefaults = {
  headers: {
    'Content-Type': 'application/json',
  }
};

axios.create(defaultConfigs);

const AxiosInterceptor: React.FC<{ children: React.ReactElement }> = ({ children }: { children: React.ReactElement }) => {
  const dispatch = useAppDispatch();
  const apiBase = process.env.REACT_APP_BUDGET_MANAGEMENT_API || '';

  axios.interceptors.request.use((config) => {
    const { accessToken } = getFromLocalStorage<AuthState>(AUTH_KEY);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (config.url?.includes(apiBase)) {
      config.withCredentials = true;
    }

    return config;
  });

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
