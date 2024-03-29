import * as React from 'react';
import axios from 'core/axios';
import { useAppDispatch } from 'store';
import { AUTH_KEY } from 'shared/constants';
import { getFromLocalStorage } from 'shared/helpers';
import { Auth } from 'shared/models';
import { removeUser, logout } from 'store/reducers';

// let retried = false;

interface AxiosInterceptorProps {
  children: React.ReactElement;
}

const AxiosInterceptor: React.FC<AxiosInterceptorProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  axios.interceptors.request.use((config) => {
    const { accessToken } = getFromLocalStorage<Auth>(AUTH_KEY);

    if (accessToken && !config.baseURL?.includes(process.env.REACT_APP_NBP_PL_API as string)) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response?.status === 401) {
        dispatch(removeUser());
        dispatch(logout());

        return Promise.reject(error.response?.data);
      }

      if (!error.isAxiosError) {
        return Promise.reject(error);
      }

      return Promise.reject(error.response?.data);
      // const originalConfig = error.config;

      // if (error.response) {
      //   if (error.response.status === 401 && !retried) {
      //     retried = true;

      //     try {
      //       const { refreshToken } = getFromLocalStorage<Auth>(AUTH_KEY);
      //       await dispatch(getNewAccessToken(refreshToken));

      //       const newAccessToken = getFromLocalStorage<Auth>(AUTH_KEY).accessToken;

      //       axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
      //       return axios(originalConfig);
      //     } catch (_error) {
      //       dispatch(removeUser());
      //       removeFromLocalStorage(AUTH_KEY);
      //       dispatch(logout());

      //       return Promise.reject(_error);
      //     }
      //   }

      //   if (!error.isAxiosError) {
      //     return Promise.reject(error);
      //   }

      //   return Promise.reject(error.response?.data);
      // }
    }
  );

  return children;
};

export default AxiosInterceptor;
