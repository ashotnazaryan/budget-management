import { AppRoute } from 'shared/models';

export const ROUTES: AppRoute = {
  home: {
    name: 'ROUTES.HOME',
    path: '/'
  },
  dashboard: {
    name: 'ROUTES.DASHBOARD',
    path: '/dashboard'
  },
  settings: {
    name: 'ROUTES.SETTINGS',
    path: '/settings'
  },
  categories: {
    name: 'ROUTES.CATEGORIES',
    path: '/categories'
  },
  accounts: {
    name: 'ROUTES.ACCOUNTS',
    path: '/accounts'
  },
  transfers: {
    name: 'ROUTES.TRANSFERS',
    path: '/transfers'
  },
  transactions: {
    name: 'ROUTES.TRANSACTIONS',
    path: '/translations'
  },
  login: {
    name: 'ROUTES.LOGIN',
    path: '/login',
  }
};
