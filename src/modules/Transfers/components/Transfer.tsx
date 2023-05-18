import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import date from 'core/date';
import { Transfer as TransferModel } from 'shared/models';
import { DATE_FORMAT } from 'shared/constants';

interface TransferProps {
  data: TransferModel;
  onClick?: (data: TransferModel) => void;
}

const Transfer: React.FC<TransferProps> = ({ data, onClick }) => {
  const { palette: { primary: { main, contrastText } } } = useTheme();
  const { fromAccount, toAccount, createdAt, amount } = data;
  const formattedCreatedAt = date(createdAt).format(DATE_FORMAT);

  const onTransactionClick = (): void => {
    if (onClick) {
      onClick(data);
    }
  };

  return (
    <Paper elevation={1} sx={{ paddingX: 2, backgroundColor: main }} onClick={onTransactionClick}>
      <Grid container columnSpacing={2} alignItems='center' sx={{ minHeight: 40, cursor: 'pointer' }}>
        <Grid item xs={3}>
          <Typography noWrap color={contrastText}>{fromAccount.name}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography noWrap color={contrastText}>{toAccount.name}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography noWrap color={contrastText}>{amount}</Typography>
        </Grid>
        <Grid item xs={3} display='flex' justifyContent='flex-end'>
          <Typography noWrap color={contrastText}>{formattedCreatedAt}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Transfer;
