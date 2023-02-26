import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Currency, CurrencyState } from 'shared/models';
import { CURRENCIES } from 'shared/constants';

const initialState: CurrencyState = {
  default: {
    iso: 'USD',
    name: 'US Dollar',
    symbol: '$'
  }
};

export const currencySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    setDefaultCurrency: (state, action: PayloadAction<Currency['iso']>): void => {
      const iso = action.payload;
      const { name, symbol } = CURRENCIES.filter(({ iso }) => iso === action.payload)[0];

      state.default = {
        iso,
        name,
        symbol
      };
    }
  },
});

export const { setDefaultCurrency } = currencySlice.actions;

export default currencySlice.reducer;
