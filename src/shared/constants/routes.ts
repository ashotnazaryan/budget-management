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
  settings: {
    name: 'Settings',
    path: '/settings'
  },
  transactions: {
    name: 'Transactions',
    path: '/transactions'
  },
  login: {
    name: 'Login',
    path: '/login',
  }
};
