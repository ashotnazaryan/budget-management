import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'store';
import { SummaryDTO, SummaryState, TransactionData } from 'shared/models';
import { mapSummary } from 'shared/helpers';

const initialState: SummaryState = {
  incomes: 0,
  expenses: 0,
  balance: 0,
  transactions: [],
  categoryTransactions: []
};

export const getSummary = createAsyncThunk('summary/getSummary', async (): Promise<SummaryState> => {
  try {
    const response = await axios.get<{ data: SummaryDTO }>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/summary/getSummary`);

    const { data } = response.data;
    return mapSummary(data);
  } catch (error) {
    console.error(error);
    return {} as SummaryState;
  }
});

export const addTransaction = createAsyncThunk('summary/addTransaction', async (transaction: TransactionData, { dispatch }): Promise<void> => {
  try {
    await axios.post<void>(`${process.env.REACT_APP_BUDGET_MANAGEMENT_API}/summary/addTransaction`, transaction);
    dispatch(getSummary());
  } catch (error) {
    console.error(error);
  }
});

export const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSummary.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        };
      })
      .addCase(getSummary.rejected, (state) => {
        return {
          ...state,
          status: 'failed'
        };
      })
      .addCase(getSummary.fulfilled, (state, action: PayloadAction<SummaryState>) => {
        return {
          ...state,
          ...action.payload,
          status: 'succeeded'
        };
      });
  }
});

export const selectSummary = (state: RootState): SummaryState => state.summary;

export default summarySlice.reducer;
