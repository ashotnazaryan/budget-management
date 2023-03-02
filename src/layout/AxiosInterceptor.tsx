import * as React from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { AUTH_KEY, ROUTES } from 'shared/constants';
import { getFromLocalStorage } from 'shared/helpers';
import { AuthState } from 'shared/models';

const { token } = getFromLocalStorage<AuthState>(AUTH_KEY);
axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
  }
});

const AxiosInterceptor = ({ children }: { children: React.ReactElement }) => {
  const navigate = useNavigate();

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        navigate(ROUTES.login.path);

        return Promise.reject(error);
      }
    }
  );

  return children;
};

export default AxiosInterceptor;
