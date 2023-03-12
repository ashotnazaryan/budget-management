/* eslint-disable no-unused-vars */
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { IconType } from './icon';

export type MuiSvg = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string; };

export enum CategoryType {
  income = 0,
  expense = 1
}

export interface Category {
  name: string;
  type: CategoryType;
  id: string;
  icon: IconType;
}
