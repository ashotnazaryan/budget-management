import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import Container from '@mui/system/Container';
import { addIncome, addExpense } from 'store/reducers/summarySlice';
import { setDefaultCurrency } from 'store/reducers/currencySlice';
import { Currency } from 'shared/models';
import Summary from './Summary';
import SummaryManager from './SummaryManager';

const Content: React.FC = () => {
  const { incomes, expenses, balance } = useSelector((state: RootState) => state.summary);
  const { default: { iso, symbol } } = useSelector((state: RootState) => state.currency);
  const dispatch = useDispatch();

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
    <Container sx={{ paddingY: 2, paddingX: 4, display: 'flex', flex: 'auto' }} disableGutters={true}>
      <SummaryManager iso={iso} addIncome={handleAddIncome} addExpense={handleAddExpense} changeCurrency={handleCurrencyChange} />
      <Summary incomes={incomes} expenses={expenses} balance={balance} currencySymbol={symbol} />
    </Container>
  );
};

export default Content;
