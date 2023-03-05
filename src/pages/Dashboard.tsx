import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';
import { useAppDispatch, useAppSelector } from 'store';
import { selectSummary, selectDefaultCurrency, addTransaction } from 'store/reducers';
import { TransactionData } from 'shared/models';
import Summary from 'components/Summary';
import Dialog from 'components/Dialog';
import Transaction from 'components/Transaction';

const Dashboard: React.FC = () => {
  const { symbol, iso } = useAppSelector(selectDefaultCurrency);
  const { incomes, expenses, balance, transactions } = useAppSelector(selectSummary);
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false);
  const [transaction, setTransaction] = React.useState<TransactionData>({} as TransactionData);
  const dispatch = useAppDispatch();

  const handleOpenDialog = (): void => {
    setDialogOpened(true);
  };

  const handleCloseDialog = (): void => {
    setDialogOpened(false);
  };

  const handleSaveDialog = (): void => {
    setDialogOpened(false);
    dispatch(addTransaction(transaction));
  };

  const handleTransactionChange = (data: TransactionData): void => {
    setTransaction(data);
  };

  return (
    <Box sx={{ flexGrow: 1, paddingY: 1 }}>
      <Grid container justifyContent='center'>
        <Grid item md={6} xs={12}>
          <Summary incomes={incomes} expenses={expenses} balance={balance} currencySymbol={symbol} transactions={transactions}  openDialog={handleOpenDialog} />
        </Grid>
      </Grid>
      <Dialog fullScreen title='Add a transaction' actionButtonText='Save' open={dialogOpened} onClose={handleCloseDialog} onSave={handleSaveDialog} sx={{
        '& .MuiDialogTitle-root': {
          padding: 2,
          textAlign: 'center'
        }
      }}>
        <Transaction currency={iso} onChange={handleTransactionChange} />
      </Dialog>
    </Box>
  );
};

export default Dashboard;
