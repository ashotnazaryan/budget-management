import { AppRoute } from 'shared/models';

export const ROUTES: AppRoute = {
  home: {
    name: 'Home',
    path: '/'
  },
  about: {
    name: 'About',
    path: 'about'
  },
  dashboard: {
    name: 'Dashboard',
    path: '/dashboard'
  },
  login: {
    name: 'Login',
    path: '/login',
  }
};
