import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { useAppDispatch, useAppSelector } from 'store';
import { getSummary, selectDefaultCurrency, selectSummary } from 'store/reducers';

const Transactions: React.FC = () => {
  const { symbol } = useAppSelector(selectDefaultCurrency);
  const { transactions } = useAppSelector(selectSummary);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!transactions.length) {
      dispatch(getSummary());
    }
  }, [dispatch, transactions]);

  return (
    <Box>
      <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: 3 }}>Transactions</Typography>
      <Grid container rowSpacing={2}>
        {
          transactions?.map(({ createdAt, name, amount }) => (
            // TODO: fix the key
            <Grid item container key={`${name}-${amount}`} columnSpacing={2}>
              <Grid item xs={3}>
                <Typography>{name}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>{symbol}{amount}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>{createdAt}</Typography>
              </Grid>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  );
};

export default Transactions;
