import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { theme } from 'core/theme.config';
import { Currency, Transaction } from 'shared/models';
import Ellipsis from 'shared/components/Ellipsis';

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
        <Grid item sm={8} xs={5} display='flex'>
          <Ellipsis color='primary.contrastText' text={name} />
        </Grid>
        <Grid item sm={2} xs={3} display='flex' justifyContent='flex-end'>
          <Ellipsis color='primary.contrastText' text={value} />
        </Grid>
        <Grid item sm={2} xs={4} display='flex' justifyContent='flex-end'>
          <Ellipsis color='primary.contrastText' text={`${currency}${amount}`} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryExpenseTransaction;
