import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { store } from 'store';
import { ErrorResponse, StatusState, Transfer, TransferDTO } from 'shared/models';
import { mapTransfers } from 'shared/helpers';
import { RootState } from './rootReducer';
import { resetApp } from './appSlice';
import { getSummary } from './summarySlice';
import { getAccounts } from './accountSlice';

export interface TransferState {
  transfers: Transfer[];
  status: StatusState;
  error?: ErrorResponse;
}

const initialState: TransferState = {
  transfers: [],
  status: 'idle'
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

export const createTransfer = createAsyncThunk<void, TransferDTO, { rejectValue: ErrorResponse }>(
  'transfers/createTransfer',
  async (transfer, { dispatch, rejectWithValue }): Promise<any> => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/transfers/transfer`, transfer);

      if (response?.data) {
        dispatch(getTransfers());
        dispatch(getAccounts());
        dispatch(getSummary());
      }
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.error);
    }
  });

export const transferSlice = createSlice({
  name: 'transfers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTransfers.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getTransfers.rejected, (state) => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getTransfers.fulfilled, (state, action: PayloadAction<Transfer[]>) => {
        return {
          ...state,
          transfers: action.payload,
          status: 'succeeded'
        };
      })
      .addCase(createTransfer.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(createTransfer.rejected, (state) => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(createTransfer.fulfilled, (state) => {
        return {
          ...state,
          status: 'succeeded'
        };
      })
      .addCase(resetApp, () => {
        return initialState;
      });
  }
});

export const selectTransfer = (state: RootState): TransferState => state.transfer;
export const selectTransferStatus = (state: RootState): TransferState['status'] => state.transfer.status;
export const selectTransferError = (state: RootState): TransferState['error'] => state.transfer.error;

export default transferSlice.reducer;
