import * as React from 'react';
import Box from '@mui/system/Box';
import { useAppDispatch, useAppSelector } from 'store';
import { selectSummary, selectCurrency, addTransaction, getSummary, getCategories, selectTransaction } from 'store/reducers';
import { CategoryType, TransactionDTO } from 'shared/models';
import { TABS } from 'shared/constants';
import Dialog from 'shared/components/Dialog';
import Skeleton from 'shared/components/Skeleton';
import Tabs from 'shared/components/Tabs';
import Summary from './components/Summary';
import NewTransaction from './components/NewTransaction';

const Dashboard: React.FC = () => {
  const { symbol, iso } = useAppSelector(selectCurrency);
  const { incomes, expenses, balance, categoryExpenseTransactions, categoryIncomeTransactions, status } = useAppSelector(selectSummary);
  const transactionStatus = useAppSelector(selectTransaction).status;
  const tabs = TABS;
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false);
  const [categoryType, setCategoryType] = React.useState<number>(0);
  const dispatch = useAppDispatch();
  const transactions = categoryType === CategoryType.expense ? categoryExpenseTransactions : categoryIncomeTransactions;

  React.useEffect(() => {
    dispatch(getSummary());
    dispatch(getCategories());
  }, [dispatch]);

  React.useEffect(() => {
    if (transactionStatus === 'succeeded') {
      setDialogOpened(false);
    }
  }, [transactionStatus]);

  const handleOpenDialog = (): void => {
    setDialogOpened(true);
  };

  const handleCloseDialog = (): void => {
    setDialogOpened(false);
  };

  const handleTabChange = (event: React.SyntheticEvent, value: number): void => {
    setCategoryType(value);
  };

  const handleSaveTransaction = (data: TransactionDTO): void => {
    dispatch(addTransaction(data));
  };

  const getContent = (): React.ReactElement => {
    if (status === 'loading' || status !== 'succeeded') {
      return <Skeleton />;
    }

    return (
      <Summary
        incomes={incomes}
        expenses={expenses}
        balance={balance}
        currencySymbol={symbol}
        transactions={transactions}
        openDialog={handleOpenDialog}
      />
    );
  };

  const content = getContent();

  return (
    <Box sx={{ flexGrow: 1, paddingY: 1 }}>
      <Tabs centered defaultValue={categoryType} tabs={tabs} onChange={handleTabChange} sx={{ marginBottom: 3 }} />
      {content}
      <Dialog
        fullScreen
        withActions={false}
        title='Add a transaction'
        actionButtonText='Save'
        open={dialogOpened}
        onClose={handleCloseDialog}
        onAction={handleSaveTransaction}
        sx={{
          '& .MuiDialogTitle-root': {
            padding: 2,
            textAlign: 'center'
          }
        }}>
        <NewTransaction
          currency={iso}
          onClose={handleCloseDialog}
          onSubmit={handleSaveTransaction}
        />
      </Dialog>
    </Box>
  );
};

export default Dashboard;
