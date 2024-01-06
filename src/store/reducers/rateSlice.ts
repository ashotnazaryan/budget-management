import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'core/axios';
import { ErrorResponse, Rate, StartEndDate, StatusState } from 'shared/models';
import { RootState } from './rootReducer';
import { resetApp } from './appSlice';

export interface RateState {
  regular: Rate;
  invoice: Rate;
  regularStatus: StatusState;
  invoiceStatus: StatusState;
  error?: ErrorResponse;
}

const initialState: RateState = {
  regular: {
    date: '',
    rates: []
  },
  invoice: {
    date: '',
    rates: []
  },
  regularStatus: 'idle',
  invoiceStatus: 'idle'
};

export const getExchangeRates = createAsyncThunk<Rate, void, { rejectValue: ErrorResponse }>(
  'rates/getExchangeRates',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<Rate>('rates/regular');

      if (data) {
        return data;
      }

      return initialState.regular;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const getInvoiceExchangeRates = createAsyncThunk<Rate, StartEndDate, { rejectValue: ErrorResponse }>(
  'rates/getInvoiceExchangeRates',
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<Rate>(`rates/invoice?startDate=${startDate}&endDate=${endDate}`);

      if (data) {
        return data;
      }

      return initialState.invoice;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const rateSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    resetRateRegularStatus(state): RateState {
      return {
        ...state,
        regularStatus: initialState.regularStatus
      };
    },
    resetRateInvoiceStatus(state): RateState {
      return {
        ...state,
        invoiceStatus: initialState.invoiceStatus
      };
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getExchangeRates.pending, (state): RateState => {
        return {
          ...state,
          regularStatus: 'loading'
        };
      })
      .addCase(getExchangeRates.rejected, (state): RateState => {
        return {
          ...state,
          regularStatus: 'failed'
        };
      })
      .addCase(getExchangeRates.fulfilled, (state, action: PayloadAction<Rate>): RateState => {
        return {
          ...state,
          regular: action.payload,
          regularStatus: 'succeeded'
        };
      })
      .addCase(getInvoiceExchangeRates.pending, (state): RateState => {
        return {
          ...state,
          invoiceStatus: 'loading'
        };
      })
      .addCase(getInvoiceExchangeRates.rejected, (state): RateState => {
        return {
          ...state,
          invoiceStatus: 'failed'
        };
      })
      .addCase(getInvoiceExchangeRates.fulfilled, (state, action: PayloadAction<Rate>): RateState => {
        return {
          ...state,
          invoice: action.payload,
          invoiceStatus: 'succeeded'
        };
      })
      .addCase(resetApp, (): RateState => {
        return initialState;
      });
  }
});

export const selectRate = (state: RootState): RateState => state.rate;
export const selectRegularRate = (state: RootState): RateState['regular'] => state.rate.regular;
export const selectInvoiceRate = (state: RootState): RateState['invoice'] => state.rate.invoice;

export const { resetRateRegularStatus, resetRateInvoiceStatus } = rateSlice.actions;

export default rateSlice.reducer;
