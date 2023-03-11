import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';
import { useAppDispatch, useAppSelector } from 'store';
import { selectSummary, selectDefaultCurrency, addTransaction } from 'store/reducers';
import { TransactionData } from 'shared/models';
import Summary from 'components/Summary';
import Dialog from 'components/Dialog';
import NewTransaction from 'components/NewTransaction';

const Dashboard: React.FC = () => {
  const { symbol, iso } = useAppSelector(selectDefaultCurrency);
  const { incomes, expenses, balance, categoryTransactions } = useAppSelector(selectSummary);
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleOpenDialog = (): void => {
    setDialogOpened(true);
  };

  const handleCloseDialog = (): void => {
    setDialogOpened(false);
  };

  // TODO: fix unknown type
  const handleSaveTransaction = (data: TransactionData | unknown): void => {
    setDialogOpened(false);
    dispatch(addTransaction(data as TransactionData));
  };

  return (
    <Box sx={{ flexGrow: 1, paddingY: 1 }}>
      <Grid container justifyContent='center'>
        <Grid item md={6} xs={12}>
          <Summary incomes={incomes} expenses={expenses} balance={balance} currencySymbol={symbol} transactions={categoryTransactions} openDialog={handleOpenDialog} />
        </Grid>
      </Grid>
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
        <NewTransaction currency={iso} onClose={handleCloseDialog} onSubmit={handleSaveTransaction} />
      </Dialog>
    </Box>
  );
};

export default Dashboard;
