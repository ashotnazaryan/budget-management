import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { useAppSelector } from 'store';
import { selectDefaultCurrency, selectSummary } from 'store/reducers';

const Transactions: React.FC = () => {
  // TODO: findByText, transactions are being gotten only in Dashboard
  const { transactions } = useAppSelector(selectSummary);
  const { symbol } = useAppSelector(selectDefaultCurrency);

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
