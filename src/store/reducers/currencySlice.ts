import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
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
  name: 'currency',
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

export const selectDefaultCurrency = (state: RootState): CurrencyState['default'] => state.currency.default;

export default currencySlice.reducer;
