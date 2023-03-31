/* eslint-disable no-unused-vars */
import { IconType } from './icon';
import { StatusState } from './common';

export enum CategoryType {
  income = 1,
  expense = 0
}

export interface CategoryDTO {
  _id: string;
  name: string;
  type: CategoryType;
  icon: IconType;
}

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  icon: IconType;
}

export interface CategoryState {
  categories: Category[];
  status: StatusState;
}
