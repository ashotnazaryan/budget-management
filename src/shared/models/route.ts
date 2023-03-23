/* eslint-disable no-unused-vars */
export enum RouteKey {
  home = 'home',
  dashboard = 'dashboard',
  settings = 'settings',
  transactions = 'transactions',
  categories = 'categories',
  login = 'login'
}

export interface RouteItem {
  name: string;
  path: string;
}

export type AppRoute = { [key in RouteKey]: RouteItem }
