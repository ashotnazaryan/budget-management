import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import date from 'core/date';
import { CategoryType, Transaction as TransactionModel } from 'shared/models';
import Icon from 'shared/components/Icon';
import { DATE_FORMAT } from 'shared/constants';

interface TransactionProps {
  data: TransactionModel;
  onClick?: (data: TransactionModel) => void;
}

const Transaction: React.FC<TransactionProps> = ({ data, onClick }) => {
  const { palette: { primary: { main, contrastText }, error } } = useTheme();
  const { name, icon, accountName, accountIcon, createdAt, amount, type } = data;
  const formattedCreatedAt = date(createdAt).format(DATE_FORMAT);

  const onTransactionClick = (): void => {
    if (onClick) {
      onClick(data);
    }
  };

  return (
    <Paper elevation={1} sx={{ paddingX: 2, backgroundColor: main }} onClick={onTransactionClick}>
      <Grid container columnSpacing={2} alignItems='center' sx={{ minHeight: 40, cursor: 'pointer' }}>
        <Grid item xs={1} display='flex'>
          {icon && <Icon name={icon} sx={{ color: contrastText, fontSize: { sm: 22, xs: 18 } }}></Icon>}
        </Grid>
        <Grid item xs={3}>
          <Typography noWrap color={contrastText}>{name}</Typography>
        </Grid>
        <Grid item xs={2} display='flex' justifyContent='flex-end'>
          <Typography noWrap color={type === CategoryType.expense ? error.main : contrastText}>{amount}</Typography>
        </Grid>
        <Grid item xs={2} display='flex' justifyContent='flex-end'>
          <Typography noWrap color={contrastText}>{accountName}</Typography>
        </Grid>
        <Grid item xs={1} display='flex'>
          {accountIcon && <Icon name={accountIcon} color='primary' sx={{ fontSize: { sm: 22, xs: 18 }, color: contrastText }}></Icon>}
        </Grid>
        <Grid item xs={3} display='flex' justifyContent='flex-end'>
          <Typography noWrap color={contrastText}>{formattedCreatedAt}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Transaction;
