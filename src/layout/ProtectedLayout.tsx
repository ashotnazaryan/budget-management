import * as React from 'react';
import { Navigate, useOutlet } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { AUTH_KEY, ROUTES } from 'shared/constants';
import { getFromLocalStorage } from 'shared/helpers';
import { AuthState } from 'shared/models';
import { setAuth } from 'store/reducers/authSlice';
import Content from './Content';

export const ProtectedLayout = () => {
  const auth = getFromLocalStorage<AuthState>(AUTH_KEY);
  const dispatch = useAppDispatch();
  const outlet = useOutlet();

  React.useEffect(() => {
    dispatch(setAuth(auth));
  }, [auth, dispatch]);

  if (!auth.isLoggedIn) {
    return <Navigate to={ROUTES.login.path} />;
  }

  return (
    <Content>{outlet}</Content>
  );
};
