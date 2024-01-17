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
  profile: {
    name: 'ROUTES.PROFILE',
    path: '/profile'
  },
  reports: {
    name: 'ROUTES.REPORTS',
    path: '/reports'
  },
  categories: {
    name: 'ROUTES.CATEGORIES',
    path: '/categories'
  },
  accounts: {
    name: 'ROUTES.ACCOUNTS',
    path: '/accounts'
  },
  charts: {
    name: 'ROUTES.CHARTS',
    path: '/charts'
  },
  transfers: {
    name: 'ROUTES.TRANSFERS',
    path: '/transfers'
  },
  transactions: {
    name: 'ROUTES.TRANSACTIONS',
    path: '/transactions'
  },
  invoices: {
    name: 'ROUTES.INVOICES',
    path: '/invoices'
  },
  login: {
    name: 'ROUTES.LOGIN',
    path: '/login',
  }
};
