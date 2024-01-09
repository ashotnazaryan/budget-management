import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import date from 'core/date';
import { IconType, Transfer as TransferModel } from 'shared/models';
import { DATE_FORMAT } from 'shared/constants';
import Icon from 'shared/components/Icon';

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
        <Grid item container xs={6} columnGap={2} display='flex' alignItems='center'>
          <Typography noWrap color={contrastText} sx={{ fontSize: { sm: 15, xs: 13 } }}>{fromAccount.name}</Typography>
          <Icon name={IconType.arrowForward} sx={{ fontSize: { sm: 22, xs: 18 }, color: contrastText }}></Icon>
          <Typography noWrap color={contrastText} sx={{ fontSize: { sm: 15, xs: 13 } }}>{toAccount.name}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography noWrap color={contrastText} sx={{ fontSize: { sm: 15, xs: 13 } }}>{amount}</Typography>
        </Grid>
        <Grid item xs={3} display='flex' justifyContent='flex-end'>
          <Typography noWrap color={contrastText} sx={{ fontSize: { sm: 15, xs: 13 } }}>{formattedCreatedAt}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Transfer;
