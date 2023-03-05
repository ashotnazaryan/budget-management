/* eslint-disable no-unused-vars */

export enum CategoryType {
  income = 0,
  expense = 1
}

export interface Category {
  name: string;
  type: CategoryType;
  id: string;
  icon?: string;
}
