/* eslint-disable no-unused-vars */
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { IconType } from './icon';

export type MuiSvg = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string; };

export enum CategoryType {
  income = 1,
  expense = 0
}

export interface CategoryDTO {
  name: string;
  type: CategoryType;
  id: string;
  icon: IconType;
}

export interface Category {
  name: string;
  type: CategoryType;
  id: string;
  icon: IconType;
}

export interface CategoryState {
  categories: Category[];
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
}
