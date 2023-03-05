import * as React from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { AUTH_KEY, ROUTES } from 'shared/constants';
import { getFromLocalStorage, removeFromLocalStorage } from 'shared/helpers';
import { Auth } from 'shared/models';
import { removeUser } from 'store/reducers';

const { token } = getFromLocalStorage<Auth>(AUTH_KEY);
axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
  }
});

const AxiosInterceptor: React.FC<{ children: React.ReactElement }> = ({ children }: { children: React.ReactElement }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = getFromLocalStorage<Auth>(AUTH_KEY);

  React.useEffect(() => {
    if (!auth.token) {
      navigate(ROUTES.login.path);
    }
  }, [auth.token, dispatch, navigate]);

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        dispatch(removeUser());
        removeFromLocalStorage(AUTH_KEY);

        return Promise.reject(error);
      }
    }
  );

  return children;
};

export default AxiosInterceptor;
