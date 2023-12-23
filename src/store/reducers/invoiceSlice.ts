import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'core/axios';
import { Amount, Currency, Invoice, NBPResponse, StatusState } from 'shared/models';
import { calculateAmount } from 'shared/helpers';
import { RootState } from './rootReducer';

export interface InvoiceState {
  salary: number;
  rate: number;
  amount: Amount;
  invoices: Invoice[];
  status: StatusState;
}

const initialState: InvoiceState = {
  salary: 0,
  rate: 1,
  amount: {
    net: 0,
    gross: 0
  } as Amount,
  invoices: [],
  status: 'idle'
};

export const getExchangeRates = createAsyncThunk<number, [Currency['iso'], string], { rejectValue: unknown }>(
  'invoices/getExchangeRates',
  async ([currencyIso, date], { rejectWithValue }) => {
    if (currencyIso === 'PLN') {
      return 1;
    }

    try {
      const { data: { rates } } = await axios.get<NBPResponse>(`/A/${currencyIso}/${date}`, {
        baseURL: process.env.REACT_APP_NBP_PL_API,
        withCredentials: false
      });

      if (rates?.length) {
        return rates[0].mid;
      }

      return 1;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  });

export const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    setAmount(state, action: PayloadAction<{ rate: number, salary: Invoice['salary'], vatIncluded: Invoice['vatIncluded'] }>): InvoiceState {
      const { rate, salary, vatIncluded } = action.payload;
      return {
        ...state,
        amount: calculateAmount(rate, Number(salary), vatIncluded)
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getExchangeRates.pending, (state): InvoiceState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getExchangeRates.rejected, (state): InvoiceState => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getExchangeRates.fulfilled, (state, action: PayloadAction<number>): InvoiceState => {
        return {
          ...state,
          rate: action.payload,
          status: 'succeeded'
        };
      });
  }
});

export const selectInvoice = (state: RootState): InvoiceState => state.invoice;
export const selectInvoiceStatus = (state: RootState): InvoiceState['status'] => state.invoice.status;

export const { setAmount } = invoiceSlice.actions;

export default invoiceSlice.reducer;
