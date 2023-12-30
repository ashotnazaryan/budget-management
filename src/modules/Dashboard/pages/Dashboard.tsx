import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/system/Box';
import { useTranslation } from 'core/i18n';
import { useAppDispatch, useAppSelector } from 'store';
import { CategoryType, Period, Option, Transaction } from 'shared/models';
import { ROUTES, TABS } from 'shared/constants';
import { selectSummary, getSummary, setActivePeriodFilter, setTransactionFilters, resetTransactionsStatus } from 'store/reducers';
import Skeleton from 'shared/components/Skeleton';
import Tabs from 'shared/components/Tabs';
import EmptyState from 'shared/components/EmptyState';
import Summary from '../components/Summary';

const Dashboard: React.FC<{}> = () => {
  const tabs = TABS;
  const navigate = useNavigate();
  const { incomes, expenses, profit, categoryExpenseTransactions, categoryIncomeTransactions, status, activePeriodFilter } = useAppSelector(selectSummary);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
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

  const handleCategoryTransactionClick = (categoryId: Transaction['categoryId']): void => {
    dispatch(setTransactionFilters({ categoryId }));
    dispatch(resetTransactionsStatus());
    navigate(`${ROUTES.transactions.path}`);
  };

  const renderContent = (): React.ReactElement => {
    if (status === 'idle') {
      return <></>;
    }

    if (status === 'loading') {
      return <Skeleton type='summary' />;
    }

    if (status === 'failed') {
      return <EmptyState text={t('DASHBOARD.EMPTY_TEXT')} />;
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
        onCategoryTransactionClick={handleCategoryTransactionClick}
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
