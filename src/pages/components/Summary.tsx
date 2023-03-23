import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Currency, TransactionData } from 'shared/models';

interface SummaryProps {
  incomes: number;
  expenses: number;
  balance: number;
  currencySymbol: Currency['symbol'];
  transactions?: TransactionData[];
  openDialog: () => void;
}

const Summary: React.FC<SummaryProps> = ({ incomes, expenses, balance, currencySymbol, transactions, openDialog }) => {
  const onOpenDialog = (): void => {
    openDialog();
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
            <Typography variant='h6' fontSize={30} color={balance >= 0 ? 'primary.contrastText' : 'secondary.main'} sx={{ textAlign: 'center' }}>{currencySymbol}{balance}</Typography>
          </Box>
        </Grid>
        <Grid item display='flex' justifyContent='flex-end' xs={12} sx={{ marginTop: 1 }}>
          <IconButton onClick={onOpenDialog}>
            <AddIcon sx={{ color: 'primary.contrastText' }} fontSize='large' />
          </IconButton>
        </Grid>
        {
          transactions?.map(({ categoryId, name, amount }) => (
            <Grid item xs={12} key={categoryId}>
              <Box sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'primary.light', paddingX: 4, paddingY: 2, marginY: 1, borderRadius: 1, width: '100%'
              }}>
                <Typography color='primary.contrastText'>{name}</Typography>
                <Typography color='primary.contrastText'>{amount}</Typography>
              </Box>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  );
};

export default Summary;
