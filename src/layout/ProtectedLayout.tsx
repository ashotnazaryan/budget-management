import { Navigate, useOutlet } from 'react-router-dom';
import { AUTH_KEY, ROUTES } from 'shared/constants';
import { getFromLocalStorage } from 'shared/helpers';
import { AuthState } from 'shared/models';
import Content from './Content';

export const ProtectedLayout = () => {
  const auth = getFromLocalStorage<AuthState>(AUTH_KEY);
  const outlet = useOutlet();

  if (!auth.isLoggedIn) {
    return <Navigate to={ROUTES.login.path} />;
  }

  return (
    <Content>{outlet}</Content>
  );
};
