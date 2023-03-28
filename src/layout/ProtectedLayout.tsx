import * as React from 'react';
import { Navigate, useOutlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import { getUserToken, selectAuth } from 'store/reducers';
import { getFromLocalStorage } from 'shared/helpers';
import { Auth } from 'shared/models';
import { AUTH_KEY, ROUTES } from 'shared/constants';
import Content from './Content';
import Loading from './Loading';

export const ProtectedLayout = () => {
  const { status } = useAppSelector(selectAuth);
  const { accessToken } = getFromLocalStorage<Auth>(AUTH_KEY);
  const outlet = useOutlet();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!accessToken) {
      dispatch(getUserToken());
    }
  }, [dispatch, accessToken]);

  if (!accessToken && (status === 'idle' || status === 'loading')) {
    return <Loading />;
  }

  if (accessToken) {
    return (
      <Content>{outlet}</Content>
    );
  }

  return <Navigate to={ROUTES.login.path} />;
};
