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
  mall = 'mall',
  shopping = 'shopping',
  // Account icons
  wallet = 'wallet',
  dollar = 'dollar',
  euro = 'euro',
  pound = 'pound',
  currencyExchange = 'currencyExchange',
  business = 'business',
  sell = 'sell',
  house = 'house',
  savings = 'savings',
  history = 'history',
  // Other icons
  plus = 'plus',
  google = 'google'
}

export interface Icon {
  name: IconType;
  icon: MuiSvg;
}

export type MuiSvg = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string; };
export type IconTypes = { [name: string]: MuiSvg };

