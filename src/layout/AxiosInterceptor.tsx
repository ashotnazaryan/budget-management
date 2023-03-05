import * as React from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { AUTH_KEY, ROUTES } from 'shared/constants';
import { getFromLocalStorage, removeFromLocalStorage } from 'shared/helpers';
import { AuthState } from 'shared/models';
import { removeAuth, removeUser } from 'store/reducers';

const { token } = getFromLocalStorage<AuthState>(AUTH_KEY);
axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
  }
});

const AxiosInterceptor: React.FC<{ children: React.ReactElement }> = ({ children }: { children: React.ReactElement }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        dispatch(removeAuth());
        dispatch(removeUser());
        removeFromLocalStorage(AUTH_KEY);
        navigate(ROUTES.login.path);

        return Promise.reject(error);
      }
    }
  );

  return children;
};

export default AxiosInterceptor;
