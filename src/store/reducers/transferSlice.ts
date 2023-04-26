import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { store } from 'store';
import { ErrorResponse, StatusState, Transfer, TransferDTO } from 'shared/models';
import { mapTransfer, mapTransfers } from 'shared/helpers';
import { RootState } from './rootReducer';
import { resetApp } from './appSlice';
import { getAccounts } from './accountSlice';

export interface TransferState {
  transfers: Transfer[];
  status: StatusState;
  deleteStatus: StatusState;
  currentStatus: StatusState;
  currentTransfer?: Transfer;
  error?: ErrorResponse;
}

const initialState: TransferState = {
  transfers: [],
  status: 'idle',
  currentStatus: 'idle',
  deleteStatus: 'idle'
};

export const getTransfers = createAsyncThunk<Transfer[], void>('transfers/getTransfers', async (_, { dispatch }): Promise<Transfer[]> => {
  try {
    const response = await axios.get<TransferDTO[]>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/transfers`);

    if (response?.data) {
      const { showDecimals } = store.getState().setting;
      await dispatch(getAccounts());
      const { accounts } = store.getState().account;

      return mapTransfers(response.data, accounts, showDecimals);
    }

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
});

export const getTransfer = createAsyncThunk<Transfer, TransferDTO['id'], { rejectValue: ErrorResponse }>(
  'transfers/getTransfer',
  async (id): Promise<Transfer> => {
    try {
      const response = await axios.get<TransferDTO>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/transfers/${id}`);

      if (response?.data) {
        const { showDecimals } = store.getState().setting;
        const { accounts } = store.getState().account;

        return mapTransfer(response.data, accounts, showDecimals);
      }

      return {} as Transfer;
    } catch (error) {
      console.error(error);
      return {} as Transfer;
    }
  });

export const createTransfer = createAsyncThunk<void, TransferDTO, { rejectValue: ErrorResponse }>(
  'transfers/createTransfer',
  async (transfer, { dispatch, rejectWithValue }): Promise<any> => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/transfers/transfer`, transfer);

      if (response?.data) {
        dispatch(getTransfers());
        dispatch(getAccounts());
      }
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.error);
    }
  });

export const editTransfer = createAsyncThunk<void, [Transfer['id'], Omit<TransferDTO, 'id'>], { rejectValue: ErrorResponse }>(
  'transfers/editTransfer',
  async ([id, account], { dispatch, rejectWithValue }): Promise<any> => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/transfers/${id}`, account);

      if (response?.data) {
        dispatch(getTransfers());
        dispatch(getAccounts());
      }
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.error);
    }
  });

export const deleteTransfer = createAsyncThunk<void, Transfer['id'], { rejectValue: ErrorResponse }>(
  'transfers/deleteTransfer',
  async (id, { dispatch, rejectWithValue }): Promise<any> => {
    try {
      await axios.delete(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/transfers/${id}`);

      dispatch(getTransfers());
      dispatch(getAccounts());
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.error);
    }
  });

export const transferSlice = createSlice({
  name: 'transfers',
  initialState,
  reducers: {
    resetCurrentTransfer(state): TransferState {
      return {
        ...state,
        currentTransfer: initialState.currentTransfer,
        currentStatus: initialState.currentStatus
      };
    },
    resetTransferStatus(state): TransferState {
      return {
        ...state,
        status: initialState.status
      };
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getTransfers.pending, (state): TransferState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getTransfers.rejected, (state): TransferState => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getTransfers.fulfilled, (state, action: PayloadAction<Transfer[]>): TransferState => {
        return {
          ...state,
          transfers: action.payload,
          status: 'succeeded'
        };
      })
      .addCase(getTransfer.pending, (state): TransferState => {
        return {
          ...state,
          currentStatus: 'loading'
        };
      })
      .addCase(getTransfer.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): TransferState => {
        return {
          ...state,
          currentStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(getTransfer.fulfilled, (state, action: PayloadAction<Transfer>): TransferState => {
        return {
          ...state,
          currentTransfer: action.payload,
          currentStatus: 'succeeded'
        };
      })
      .addCase(createTransfer.pending, (state): TransferState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(createTransfer.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): TransferState => {
        return {
          ...state,
          status: 'failed',
          error: action.payload
        };
      })
      .addCase(createTransfer.fulfilled, (state): TransferState => {
        return {
          ...state,
          status: 'succeeded'
        };
      })
      .addCase(editTransfer.pending, (state): TransferState => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(editTransfer.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): TransferState => {
        return {
          ...state,
          status: 'failed',
          error: action.payload
        };
      })
      .addCase(editTransfer.fulfilled, (state): TransferState => {
        return {
          ...state,
          status: 'succeeded'
        };
      })
      .addCase(deleteTransfer.pending, (state): TransferState => {
        return {
          ...state,
          deleteStatus: 'loading'
        };
      })
      .addCase(deleteTransfer.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): TransferState => {
        return {
          ...state,
          deleteStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(deleteTransfer.fulfilled, (state): TransferState => {
        return {
          ...state,
          deleteStatus: 'succeeded'
        };
      })
      .addCase(resetApp, (): TransferState => {
        return initialState;
      });
  }
});

export const selectTransfer = (state: RootState): TransferState => state.transfer;
export const selectTransferStatus = (state: RootState): TransferState['status'] => state.transfer.status;
export const selectTransferError = (state: RootState): TransferState['error'] => state.transfer.error;
export const selectCurrentTransfer = (state: RootState): TransferState['currentTransfer'] => state.transfer.currentTransfer;

export const { resetCurrentTransfer, resetTransferStatus } = transferSlice.actions;
export default transferSlice.reducer;
