import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/system/Box';
import { useAppDispatch, useAppSelector } from 'store';
import { CategoryType } from 'shared/models';
import { ROUTES, TABS } from 'shared/constants';
import Skeleton from 'shared/components/Skeleton';
import Tabs from 'shared/components/Tabs';
import { selectSummary, selectCurrency, getSummary } from 'store/reducers';
import Summary from '../components/Summary';

const Dashboard: React.FC = () => {
  const tabs = TABS;
  const navigate = useNavigate();
  const { symbol } = useAppSelector(selectCurrency);
  const { incomes, expenses, profit, categoryExpenseTransactions, categoryIncomeTransactions, status } = useAppSelector(selectSummary);
  const dispatch = useAppDispatch();
  const [categoryType, setCategoryType] = React.useState<number>(0);
  const transactions = categoryType === CategoryType.expense ? categoryExpenseTransactions : categoryIncomeTransactions;

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(getSummary());
    }
  }, [dispatch, status]);

  const handleTabChange = (event: React.SyntheticEvent, value: number): void => {
    setCategoryType(value);
  };

  const handleAddTransaction = (): void => {
    navigate(`${ROUTES.transactions.path}/new`, { state: { categoryType } });
  };

  const getContent = (): React.ReactElement => {
    if (status === 'loading' || status !== 'succeeded') {
      return <Skeleton />;
    }

    return (
      <Summary
        incomes={incomes}
        expenses={expenses}
        profit={profit}
        currencySymbol={symbol}
        transactions={transactions}
        addTransaction={handleAddTransaction}
      />
    );
  };

  const content = getContent();

  return (
    <Box sx={{ flexGrow: 1, paddingY: 1 }}>
      <Tabs centered defaultValue={categoryType} tabs={tabs} onChange={handleTabChange} sx={{ marginBottom: 3 }} />
      {content}
    </Box>
  );
};

export default Dashboard;
