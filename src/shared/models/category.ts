/* eslint-disable no-unused-vars */
import { IconType } from './icon';

export enum CategoryType {
  income = 1,
  expense = 0
}

export interface CategoryDTO {
  _id: string;
  name: string;
  type: CategoryType;
  icon: IconType;
  isDefaultCategory?: boolean;
}

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  icon: IconType;
  isDefaultCategory?: boolean;
}
