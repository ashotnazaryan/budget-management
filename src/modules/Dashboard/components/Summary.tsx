import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Currency, Transaction } from 'shared/models';
import { isPositiveString } from 'shared/helpers';
import CategoryTransaction from '../../components/CategoryTransaction';

interface SummaryProps {
  incomes: string;
  expenses: string;
  balance: string;
  currencySymbol: Currency['symbol'];
  transactions: Transaction[];
  addTransaction: () => void;
}

const Summary: React.FC<SummaryProps> = ({ incomes, expenses, balance, currencySymbol, transactions, addTransaction }) => {
  const onAddTransaction = (): void => {
    addTransaction();
  };

  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        paddingX: 2,
        paddingY: 4,
        borderRadius: 1
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h5' color='primary.contrastText' sx={{ textAlign: 'center', marginBottom: 4 }}>
            Summary
          </Typography>
        </Grid>
        <Grid container flexWrap='nowrap' sx={{ backgroundColor: 'primary.dark', borderTopLeftRadius: (theme) => theme.spacing(1), borderTopRightRadius: (theme) => theme.spacing(1) }}>
          <Grid item xs={6}>
            <Typography variant='subtitle1' color='primary.contrastText' component='p' sx={{ textAlign: 'center' }}>
              Total Income
            </Typography>
            <Typography color='primary.contrastText' sx={{ textAlign: 'center' }}>{currencySymbol}{incomes}</Typography>
          </Grid>
          <Divider orientation='vertical' sx={{ backgroundColor: 'primary.light' }} flexItem />
          <Grid item xs={6}>
            <Typography variant='subtitle1' color='primary.contrastText' component='p' sx={{ textAlign: 'center' }}>
              Total Expenses
            </Typography>
            <Typography color='primary.contrastText' sx={{ textAlign: 'center' }}>{currencySymbol}{expenses}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ backgroundColor: 'primary.light', paddingY: 2, borderBottomLeftRadius: (theme) => theme.spacing(1), borderBottomRightRadius: (theme) => theme.spacing(1) }}>
            <Typography variant='h6' color='primary.contrastText' component='p' sx={{ textAlign: 'center' }}>
              Remaining Monthly Balance
            </Typography>
            <Typography variant='h6' fontSize={26} color={isPositiveString(balance) ? 'primary.contrastText' : 'secondary.main'} sx={{ textAlign: 'center' }}>{currencySymbol}{balance}</Typography>
          </Box>
        </Grid>
        <Grid item display='flex' justifyContent='flex-end' xs={12} sx={{ marginTop: 1 }}>
          <IconButton onClick={onAddTransaction}>
            <AddIcon sx={{ color: 'primary.contrastText' }} fontSize='large' />
          </IconButton>
        </Grid>
        {
          transactions.map(({ categoryId, name, amount, icon, percentValue }) => (
            <Grid item xs={12} key={categoryId}>
              <CategoryTransaction name={name} amount={amount} currency={currencySymbol} value={percentValue} icon={icon} />
            </Grid>
          ))
        }
      </Grid>
    </Box>
  );
};

export default Summary;
