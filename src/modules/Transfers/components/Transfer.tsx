import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { Transfer as TransferModel } from 'shared/models';
import Ellipsis from 'shared/components/Ellipsis';

interface TransferProps {
  data: TransferModel;
  onClick?: (data: TransferModel) => void;
}

const Transfer: React.FC<TransferProps> = ({ data, onClick }) => {
  const { palette: { primary: { main, contrastText } } } = useTheme();
  const { fromAccount, toAccount, createdAt, amount } = data;

  const onTransactionClick = (): void => {
    if (onClick) {
      onClick(data);
    }
  };

  return (
    <Paper elevation={1} sx={{ paddingX: 2, backgroundColor: main }} onClick={onTransactionClick}>
      <Grid container columnSpacing={2} alignItems='center' sx={{ minHeight: 40, cursor: 'pointer' }}>
        <Grid item xs={3}>
          <Ellipsis text={fromAccount.name} color={contrastText} />
        </Grid>
        <Grid item xs={3}>
          <Ellipsis text={toAccount.name} color={contrastText} />
        </Grid>
        <Grid item xs={3}>
          <Ellipsis text={amount} color={contrastText} />
        </Grid>
        <Grid item xs={3} display='flex' justifyContent='flex-end'>
          <Ellipsis text={createdAt} color={contrastText} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Transfer;
