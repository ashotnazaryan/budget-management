import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/system/Box';
import { useAppDispatch, useAppSelector } from 'store';
import { CategoryType, Period, Option } from 'shared/models';
import { ROUTES, TABS } from 'shared/constants';
import Skeleton from 'shared/components/Skeleton';
import Tabs from 'shared/components/Tabs';
import { selectSummary, getSummary, setActivePeriodFilter } from 'store/reducers';
import Summary from '../components/Summary';

const Dashboard: React.FC = () => {
  const tabs = TABS;
  const navigate = useNavigate();
  const { incomes, expenses, profit, categoryExpenseTransactions, categoryIncomeTransactions, status, activePeriodFilter } = useAppSelector(selectSummary);
  const dispatch = useAppDispatch();
  const [categoryType, setCategoryType] = React.useState<Option['value']>(String(CategoryType.expense));
  const transactions = categoryType === String(CategoryType.expense) ? categoryExpenseTransactions : categoryIncomeTransactions;

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(getSummary(activePeriodFilter));
    }
  }, [dispatch, status, activePeriodFilter]);

  const handleTabChange = (event: React.SyntheticEvent, value: Option['value']): void => {
    setCategoryType(value);
  };

  const handleAddTransaction = (): void => {
    navigate(`${ROUTES.transactions.path}/new`, { state: { categoryType } });
  };

  const handleFilter = (period: Period): void => {
    dispatch(getSummary(period));
    dispatch(setActivePeriodFilter(period));
  };

  const renderContent = (): React.ReactElement => {
    if (status === 'loading' || status !== 'succeeded') {
      return <Skeleton type='summary' />;
    }

    return (
      <Summary
        incomes={incomes}
        expenses={expenses}
        profit={profit}
        transactions={transactions}
        period={activePeriodFilter}
        onAddTransaction={handleAddTransaction}
        onFilter={handleFilter}
      />
    );
  };

  return (
    <Box sx={{ flexGrow: 1, paddingY: 1 }}>
      <Tabs centered defaultValue={categoryType} tabs={tabs} onChange={handleTabChange} sx={{ marginBottom: 3 }} />
      {renderContent()}
    </Box>
  );
};

export default Dashboard;
