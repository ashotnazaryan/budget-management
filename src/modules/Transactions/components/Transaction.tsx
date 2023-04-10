import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { CategoryType, Currency, Transaction as TransactionModel } from 'shared/models';
import Icon from 'shared/components/Icon';
import Ellipsis from 'shared/components/Ellipsis';

interface TransactionProps {
  data: TransactionModel;
  symbol: Currency['symbol'];
  onClick?: (data: TransactionModel) => void;
}

const Transaction: React.FC<TransactionProps> = ({ data, symbol, onClick }) => {
  const { palette: { info: { contrastText }, error } } = useTheme();
  const { name, icon, accountName, accountIcon, createdAt, amount, type } = data;

  const onTransactionClick = (): void => {
    if (onClick) {
      onClick(data);
    }
  };

  return (
    <Paper elevation={1} sx={{ paddingX: 2 }} onClick={onTransactionClick}>
      <Grid container columnSpacing={2} alignItems='center' sx={{ minHeight: 30, cursor: 'pointer' }}>
        <Grid item xs={1} display='flex'>
          {icon && <Icon name={icon} sx={{ color: contrastText, fontSize: { sm: 22, xs: 18 } }}></Icon>}
        </Grid>
        <Grid item xs={3}>
          <Ellipsis text={name} color={contrastText} />
        </Grid>
        <Grid item xs={2} display='flex' justifyContent='flex-end'>
          <Ellipsis text={`${symbol}${amount}`} color={type === CategoryType.expense ? error.main : contrastText} />
        </Grid>
        <Grid item xs={2} display='flex' justifyContent='flex-end'>
          <Ellipsis text={accountName} color={contrastText} />
        </Grid>
        <Grid item xs={1} display='flex'>
          {accountIcon && <Icon name={accountIcon} color='primary' sx={{ fontSize: { sm: 22, xs: 18 }, color: contrastText }}></Icon>}
        </Grid>
        <Grid item xs={3} display='flex' justifyContent='flex-end'>
          <Ellipsis text={createdAt} color={contrastText} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Transaction;
