/* eslint-disable no-unused-vars */
export enum RouteKey {
  home = 'home',
  about = 'about',
  login = 'login'
}

export interface RouteItem {
  name: string;
  path: string;
}

export type AppRoute = { [key in RouteKey]: RouteItem }
