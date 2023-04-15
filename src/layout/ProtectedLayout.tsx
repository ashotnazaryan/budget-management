import * as React from 'react';
import { Navigate, useOutlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import { getSettings, getUserInfo, getUserToken, selectApp, selectAuth } from 'store/reducers';
import { getFromLocalStorage } from 'shared/helpers';
import { Auth } from 'shared/models';
import { AUTH_KEY, ROUTES } from 'shared/constants';
import Content from './Content';
import Loading from './Loading';

export const ProtectedLayout = () => {
  const { status: authStatus } = useAppSelector(selectAuth);
  const { status: appStatus } = useAppSelector(selectApp);
  const { accessToken } = getFromLocalStorage<Auth>(AUTH_KEY);
  const outlet = useOutlet();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!accessToken) {
      dispatch(getUserToken());
    }
  }, [dispatch, accessToken]);

  React.useEffect(() => {
    if (accessToken) {
      dispatch(getUserInfo());
      dispatch(getSettings());
    }
  }, [dispatch, accessToken]);

  if (!accessToken && (authStatus === 'idle' || authStatus === 'loading')) {
    return <Loading />;
  }

  if (accessToken && (appStatus === 'idle' || appStatus === 'loading')) {
    return <Loading />;
  }

  if (accessToken) {
    return (
      <Content>{outlet}</Content>
    );
  }

  return <Navigate to={ROUTES.login.path} />;
};
