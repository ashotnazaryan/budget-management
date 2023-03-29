/* eslint-disable no-unused-vars */
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';

export enum IconType {
  // Category icons
  salary = 'salary',
  otherIncome = 'otherIncome',
  rent = 'rent',
  groceries = 'groceries',
  default = 'default',
  media = 'media',
  transportation = 'transportation',
  otherExpense = 'otherExpense',
  // Account icons
  wallet = 'wallet'
}

type MuiSvg = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string; };
export type IconTypes = { [name: string]: MuiSvg };

