import { AppRoute } from 'shared/models';

export const ROUTES: AppRoute = {
  home: {
    name: 'Home',
    path: '/'
  },
  dashboard: {
    name: 'Dashboard',
    path: '/dashboard'
  },
  settings: {
    name: 'Settings',
    path: '/settings'
  },
  categories: {
    name: 'Categories',
    path: '/categories'
  },
  accounts: {
    name: 'Accounts',
    path: '/accounts'
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
