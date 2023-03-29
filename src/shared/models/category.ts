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
  id: string;
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
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
