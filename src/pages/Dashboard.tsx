import * as React from 'react';
import Box from '@mui/system/Box';
import { useAppDispatch, useAppSelector } from 'store';
import { selectSummary, selectCurrency, addTransaction, getSummary } from 'store/reducers';
import { TransactionDTO } from 'shared/models';
import Dialog from 'shared/components/Dialog';
import Skeleton from 'shared/components/Skeleton';
import Summary from './components/Summary';
import NewTransaction from './components/NewTransaction';

const Dashboard: React.FC = () => {
  const { symbol, iso } = useAppSelector(selectCurrency);
  const { incomes, expenses, balance, categoryExpenseTransactions, status } = useAppSelector(selectSummary);
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getSummary());
  }, [dispatch]);

  const handleOpenDialog = (): void => {
    setDialogOpened(true);
  };

  const handleCloseDialog = (): void => {
    setDialogOpened(false);
  };

  const handleSaveTransaction = (data: TransactionDTO): void => {
    setDialogOpened(false);
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
        transactions={categoryExpenseTransactions}
        openDialog={handleOpenDialog}
      />
    );
  };

  const content = getContent();

  return (
    <Box sx={{ flexGrow: 1, paddingY: 1 }}>
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
