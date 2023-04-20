/* eslint-disable no-unused-vars */
export enum RouteKey {
  home = 'home',
  dashboard = 'dashboard',
  settings = 'settings',
  transactions = 'transactions',
  categories = 'categories',
  accounts = 'accounts',
  transfers = 'transfers',
  login = 'login'
}

export interface RouteItem {
  name: string;
  path: string;
}

export type AppRoute = { [key in RouteKey]: RouteItem }
