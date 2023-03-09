import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useAppSelector } from 'store';
import { selectSummary } from 'store/reducers';

const Transactions: React.FC = () => {
  const { transactions } = useAppSelector(selectSummary);

  return (
    <Grid container rowSpacing={2}>
      {
        transactions?.map(({ uuid, createdAt, name, amount }) => (
          <Grid item container key={uuid} columnSpacing={2}>
            <Grid item xs={3}>
              <Typography>{name}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{amount}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{createdAt}</Typography>
            </Grid>
          </Grid>
        ))
      }
    </Grid>
  );
};

export default Transactions;
