import * as React from 'react';
import axios, { AxiosError, AxiosResponse, CreateAxiosDefaults } from 'axios';
import { useAppDispatch } from 'store';
import { AUTH_KEY } from 'shared/constants';
import { getFromLocalStorage, removeFromLocalStorage } from 'shared/helpers';
import { AuthState, ErrorResponse } from 'shared/models';
import { removeUser, logout } from 'store/reducers';

const defaultConfigs: CreateAxiosDefaults = {
  headers: {
    'Content-Type': 'application/json',
  }
};

const mapResponse = (response: AxiosResponse): AxiosResponse => {
  if (response) {
    if (response.data.data || response.data.data === 0) {
      response.data = response.data.data;
    }

    return response;
  }

  throw new Error(response);
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
      return mapResponse(response);
    },
    (error: AxiosError<ErrorResponse>) => {
      if (error.response?.status === 401) {
        dispatch(removeUser());
        removeFromLocalStorage(AUTH_KEY);
        dispatch(logout());

        return Promise.reject(error);
      }

      if (!error.isAxiosError) {
        return Promise.reject(error);
      }

      return Promise.reject(error.response?.data);
    }
  );

  return children;
};

export default AxiosInterceptor;
