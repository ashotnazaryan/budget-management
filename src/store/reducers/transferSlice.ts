import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'core/axios';
import { store } from 'store';
import { ErrorResponse, StatusState, Transfer, TransferDTO } from 'shared/models';
import { mapTransfer, mapTransfers } from 'shared/helpers';
import { RootState } from './rootReducer';
import { resetApp } from './appSlice';
import { getAccounts, resetAccountsStatus } from './accountSlice';

export interface TransferState {
  transfers: Transfer[];
  status: StatusState;
  getStatus: StatusState;
  createEditStatus: StatusState;
  deleteStatus: StatusState;
  currentTransfer?: Transfer;
  error?: ErrorResponse;
}

const initialState: TransferState = {
  transfers: [],
  status: 'idle',
  getStatus: 'idle',
  createEditStatus: 'idle',
  deleteStatus: 'idle'
};

export const getTransfers = createAsyncThunk<Transfer[], void, { rejectValue: ErrorResponse }>(
  'transfers/getTransfers', async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get<TransferDTO[]>('transfers');

      if (data) {
        const { showDecimals } = store.getState().setting;
        let { accounts } = store.getState().account;

        if (!accounts.length) {
          await dispatch(getAccounts());

          accounts = store.getState().account.accounts;
        }

        return mapTransfers(data, accounts, showDecimals);
      }

      return [];
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const getTransfer = createAsyncThunk<Transfer, TransferDTO['id'], { rejectValue: ErrorResponse }>(
  'transfers/getTransfer',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get<TransferDTO>(`transfers/${id}`);

      if (data) {
        const { showDecimals } = store.getState().setting;
        let { accounts } = store.getState().account;

        if (!accounts.length) {
          await dispatch(getAccounts());

          accounts = store.getState().account.accounts;
        }

        return mapTransfer(data, accounts, showDecimals);
      }

      return {} as Transfer;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const createTransfer = createAsyncThunk<void, TransferDTO, { rejectValue: ErrorResponse }>(
  'transfers/createTransfer',
  async (transfer, { dispatch, rejectWithValue }) => {
    try {
      await axios.post<void>('transfers/transfer', transfer);

      dispatch(resetTransfersStatus());
      dispatch(resetAccountsStatus());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const editTransfer = createAsyncThunk<void, [Transfer['id'], Omit<TransferDTO, 'id'>], { rejectValue: ErrorResponse }>(
  'transfers/editTransfer',
  async ([id, account], { dispatch, rejectWithValue }) => {
    try {
      await axios.put<void>(`transfers/${id}`, account);

      dispatch(resetTransfersStatus());
      dispatch(resetAccountsStatus());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const deleteTransfer = createAsyncThunk<void, Transfer['id'], { rejectValue: ErrorResponse }>(
  'transfers/deleteTransfer',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete<void>(`transfers/${id}`);

      dispatch(resetTransfersStatus());
      dispatch(resetAccountsStatus());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const transferSlice = createSlice({
  name: 'transfers',
  initialState,
  reducers: {
    resetTransfersStatus(state): TransferState {
      return {
        ...state,
        status: initialState.status
      };
    },
    resetGetTransferStatus(state): TransferState {
      return {
        ...state,
        currentTransfer: initialState.currentTransfer,
        getStatus: initialState.getStatus
      };
    },
    setGetTransferErrorStatus(state): TransferState {
      return {
        ...state,
        getStatus: 'failed'
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
          getStatus: 'loading'
        };
      })
      .addCase(getTransfer.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): TransferState => {
        return {
          ...state,
          getStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(getTransfer.fulfilled, (state, action: PayloadAction<Transfer>): TransferState => {
        return {
          ...state,
          currentTransfer: action.payload,
          getStatus: 'succeeded'
        };
      })
      .addCase(createTransfer.pending, (state): TransferState => {
        return {
          ...state,
          createEditStatus: 'loading'
        };
      })
      .addCase(createTransfer.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): TransferState => {
        return {
          ...state,
          createEditStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(createTransfer.fulfilled, (state): TransferState => {
        return {
          ...state,
          createEditStatus: 'succeeded'
        };
      })
      .addCase(editTransfer.pending, (state): TransferState => {
        return {
          ...state,
          createEditStatus: 'loading'
        };
      })
      .addCase(editTransfer.rejected, (state, action: PayloadAction<ErrorResponse | undefined>): TransferState => {
        return {
          ...state,
          createEditStatus: 'failed',
          error: action.payload
        };
      })
      .addCase(editTransfer.fulfilled, (state): TransferState => {
        return {
          ...state,
          createEditStatus: 'succeeded'
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

export const { resetGetTransferStatus, resetTransfersStatus, setGetTransferErrorStatus } = transferSlice.actions;
export default transferSlice.reducer;
