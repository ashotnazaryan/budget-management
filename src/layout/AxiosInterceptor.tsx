import * as React from 'react';
import axios, { AxiosError, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import { useAppDispatch } from 'store';
import { AUTH_KEY } from 'shared/constants';
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from 'shared/helpers';
import { Auth, AuthDTO } from 'shared/models';
import { getUserInfo, logout, removeUser } from 'store/reducers';

const defaultConfigs: CreateAxiosDefaults = {
  headers: {
    'Content-Type': 'application/json',
  }
};

axios.create(defaultConfigs);

const AxiosInterceptor: React.FC<{ children: React.ReactElement }> = ({ children }: { children: React.ReactElement }) => {
  const dispatch = useAppDispatch();
  const apiBase = process.env.REACT_APP_BUDGET_MANAGEMENT_API || '';
  let retry = false;

  axios.interceptors.request.use(
    (config) => {
      const { accessToken } = getFromLocalStorage<Auth>(AUTH_KEY);

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      if (config.url?.includes(apiBase)) {
        config.withCredentials = true;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      if (error.response?.status === 401 && !retry) {
        const config = error.config as AxiosRequestConfig;
        retry = true;
        const { refreshToken, userId } = getFromLocalStorage<Auth>(AUTH_KEY);
        try {
          const { data } = await axios.post<{ data: AuthDTO }>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/auth/access-token`, { refreshToken });
          const newAuth: Auth = {
            userId,
            accessToken: data.data.access_token,
            refreshToken: data.data.refresh_token
          };

          if (data) {
            saveToLocalStorage<Auth>(AUTH_KEY, newAuth);
            axios.defaults.headers.common['Authorization'] = `Bearer ${newAuth.accessToken}`;
          }

          // TODO: check this (401 after fetched new access token)
          dispatch(getUserInfo(newAuth.accessToken));

          return axios.request(config);
        } catch {
          dispatch(removeUser());
          removeFromLocalStorage(AUTH_KEY);
          dispatch(logout());

          return Promise.reject(error);
        }
      }
    }
  );

  return children;
};

export default AxiosInterceptor;
