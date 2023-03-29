import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Currency, Transaction } from 'shared/models';
import { theme } from 'core/theme.config';

interface CategoryExpenseTransactionProps {
  name: Transaction['name'];
  amount: Transaction['amount'];
  currency: Currency['symbol'];
  value?: Transaction['percentValue'];
}

const CategoryExpenseTransaction: React.FC<CategoryExpenseTransactionProps> = ({ name, amount, currency, value = '' }) => {
  const getBGColor = () => {
    const percentageValue = parseInt(value);

    return `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.dark} calc(${percentageValue}%), ${theme.palette.primary.light} calc(${percentageValue}%), ${theme.palette.primary.light} 100%)`;
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: getBGColor(),
      paddingX: 4,
      paddingY: 2,
      marginY: 1,
      borderRadius: 1,
      width: '100%'
    }}>
      <Grid container>
        <Grid item xs={4} display='flex'>
          <Typography color='primary.contrastText'>{name}</Typography>
        </Grid>
        <Grid item xs={4} display='flex' justifyContent='flex-end'>
          <Typography color='primary.contrastText'>{value}</Typography>
        </Grid>
        <Grid item xs={4} display='flex' justifyContent='flex-end'>
          <Typography color='primary.contrastText'>{currency}{amount}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryExpenseTransaction;
