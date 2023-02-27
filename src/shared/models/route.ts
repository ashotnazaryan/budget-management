/* eslint-disable no-unused-vars */
export enum RouteKey {
  home = 'home',
  about = 'about'
}

export interface RouteItem {
  name: string;
  path: string;
}

export type AppRoute = { [key in RouteKey]: RouteItem }
