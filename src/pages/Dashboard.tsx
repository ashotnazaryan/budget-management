import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';
import { useAppDispatch, useAppSelector } from 'store';
import { addIncome, addExpense, selectSummary, selectDefaultCurrency, setDefaultCurrency } from 'store/reducers';
import { Currency } from 'shared/models';
import Summary from '../components/Summary';
import SummaryManager from '../components/SummaryManager';

const Dashboard: React.FC = () => {
  const { iso, symbol } = useAppSelector(selectDefaultCurrency);
  const { incomes, expenses, balance } = useAppSelector(selectSummary);
  const dispatch = useAppDispatch();

  const handleAddIncome = (value: number): void => {
    dispatch(addIncome(value));
  };

  const handleAddExpense = (value: number): void => {
    dispatch(addExpense(value));
  };

  const handleCurrencyChange = (value: Currency['iso']): void => {
    dispatch(setDefaultCurrency(value));
  };

  return (
    <Box sx={{ flexGrow: 1, paddingY: 1 }}>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <SummaryManager iso={iso} addIncome={handleAddIncome} addExpense={handleAddExpense} changeCurrency={handleCurrencyChange} />
        </Grid>
        <Grid item md={6} xs={12}>
          <Summary incomes={incomes} expenses={expenses} balance={balance} currencySymbol={symbol} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
