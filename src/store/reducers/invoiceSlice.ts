import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'core/axios';
import { store } from 'store';
import { Amount, Currency, ErrorResponse, Invoice, InvoiceDTO, NBPResponse, StatusState } from 'shared/models';
import { calculateAmount, mapInvoice, mapInvoices } from 'shared/helpers';
import { RootState } from './rootReducer';
import { resetApp } from './appSlice';

export interface InvoiceState {
  salary: number;
  rate: number;
  amount: Amount;
  invoices: Invoice[];
  rateStatus: StatusState;
  status: StatusState;
  getStatus: StatusState;
  createEditStatus: StatusState;
  deleteStatus: StatusState;
  currentInvoice?: Invoice;
  error?: ErrorResponse;
}

const initialState: InvoiceState = {
  salary: 0,
  rate: 1,
  amount: {
    net: 0,
    gross: 0
  } as Amount,
  invoices: [],
  rateStatus: 'idle',
  status: 'idle',
  getStatus: 'idle',
  createEditStatus: 'idle',
  deleteStatus: 'idle'
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

export const getInvoices = createAsyncThunk<Invoice[], void, { rejectValue: ErrorResponse }>(
  'invoices/getInvoices',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<InvoiceDTO[]>('invoices');

      if (data) {
        const { showDecimals } = store.getState().setting;

        return mapInvoices(data, showDecimals);
      }

      return [];
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const getInvoice = createAsyncThunk<Invoice, InvoiceDTO['id'], { rejectValue: ErrorResponse }>(
  'invoices/getInvoice',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<InvoiceDTO>(`invoices/${id}`);

      if (data) {
        const { showDecimals } = store.getState().setting;

        return mapInvoice(data, showDecimals);
      }

      return {} as Invoice;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const createInvoice = createAsyncThunk<void, InvoiceDTO, { rejectValue: ErrorResponse }>(
  'invoices/createInvoice',
  async (invoice, { dispatch, rejectWithValue }) => {
    try {
      await axios.post<void>('invoices/invoice', invoice);

      dispatch(resetInvoicesStatus());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const editInvoice = createAsyncThunk<void, [Invoice['id'], Omit<InvoiceDTO, 'id'>], { rejectValue: ErrorResponse }>(
  'invoices/editInvoice',
  async ([id, invoice], { dispatch, rejectWithValue }) => {
    try {
      await axios.put<void>(`invoices/${id}`, invoice);

      dispatch(resetInvoicesStatus());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const deleteInvoice = createAsyncThunk<void, Invoice['id'], { rejectValue: ErrorResponse }>(
  'invoices/deleteInvoice',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete<void>(`invoices/${id}`);

      dispatch(resetInvoicesStatus());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    setInvoiceAmount(state, action: PayloadAction<{ rate: number, salary: Invoice['salary'], vatIncluded?: Invoice['vatIncluded'] }>): InvoiceState {
      const { rate, salary, vatIncluded } = action.payload;
      return {
        ...state,
        amount: calculateAmount(rate, Number(salary), !!vatIncluded)
      };
    },
    resetInvoicesStatus(state): InvoiceState {
      return {
        ...state,
        status: initialState.status
      };
    },
    resetGetInvoiceStatus(state): InvoiceState {
      return {
        ...state,
        currentInvoice: initialState.currentInvoice,
        getStatus: initialState.getStatus
      };
    },
    resetCreateEditInvoiceStatus(state): InvoiceState {
      return {
        ...state,
        createEditStatus: 'idle'
      };
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getExchangeRates.pending, (state): InvoiceState => {
        return {
          ...state,
          rateStatus: 'loading'
        };
      })
      .addCase(getExchangeRates.rejected, (state): InvoiceState => {
        return {
          ...state,
          rateStatus: 'failed'
        };
      })
      .addCase(getExchangeRates.fulfilled, (state, action: PayloadAction<number>): InvoiceState => {
        return {
          ...state,
          rate: action.payload,
          rateStatus: 'succeeded'
        };
      })
      .addCase(getInvoices.pending, (state): InvoiceState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getInvoices.rejected, (state): InvoiceState => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getInvoices.fulfilled, (state, action: PayloadAction<Invoice[]>): InvoiceState => {
        return {
          ...state,
          invoices: action.payload,
          status: 'succeeded'
        };
      })
      .addCase(getInvoice.pending, (state): InvoiceState => {
        return {
          ...state,
          getStatus: 'loading'
        };
      })
      .addCase(getInvoice.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): InvoiceState => {
        return {
          ...state,
          getStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(getInvoice.fulfilled, (state, action: PayloadAction<Invoice>): InvoiceState => {
        return {
          ...state,
          currentInvoice: action.payload,
          getStatus: 'succeeded'
        };
      })
      .addCase(createInvoice.pending, (state): InvoiceState => {
        return {
          ...state,
          createEditStatus: 'loading'
        };
      })
      .addCase(createInvoice.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): InvoiceState => {
        return {
          ...state,
          createEditStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(createInvoice.fulfilled, (state): InvoiceState => {
        return {
          ...state,
          createEditStatus: 'succeeded'
        };
      })
      .addCase(editInvoice.pending, (state): InvoiceState => {
        return {
          ...state,
          createEditStatus: 'loading'
        };
      })
      .addCase(editInvoice.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): InvoiceState => {
        return {
          ...state,
          createEditStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(editInvoice.fulfilled, (state): InvoiceState => {
        return {
          ...state,
          createEditStatus: 'succeeded'
        };
      })
      .addCase(deleteInvoice.pending, (state): InvoiceState => {
        return {
          ...state,
          deleteStatus: 'loading'
        };
      })
      .addCase(deleteInvoice.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): InvoiceState => {
        return {
          ...state,
          deleteStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(deleteInvoice.fulfilled, (state): InvoiceState => {
        return {
          ...state,
          deleteStatus: 'succeeded'
        };
      })
      .addCase(resetApp, (): InvoiceState => {
        return initialState;
      });
  }
});

export const selectInvoice = (state: RootState): InvoiceState => state.invoice;
export const selectInvoiceAmount = (state: RootState): InvoiceState['amount'] => state.invoice.amount;
export const selectInvoiceStatus = (state: RootState): InvoiceState['status'] => state.invoice.status;
export const selectCurrentInvoice = (state: RootState): InvoiceState['currentInvoice'] => state.invoice.currentInvoice;
export const selectInvoiceError = (state: RootState): InvoiceState['error'] => state.invoice.error;

export const { setInvoiceAmount, resetInvoicesStatus, resetGetInvoiceStatus, resetCreateEditInvoiceStatus } = invoiceSlice.actions;

export default invoiceSlice.reducer;
