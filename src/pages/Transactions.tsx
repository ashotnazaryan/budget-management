import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { useAppDispatch, useAppSelector } from 'store';
import { getTransactions, selectCurrency, selectTransaction } from 'store/reducers';
import Skeleton from 'shared/components/Skeleton';
import Ellipsis from 'shared/components/Ellipsis';

interface TransactionsProps { }

const Transactions: React.FC<TransactionsProps> = () => {
  const { symbol } = useAppSelector(selectCurrency);
  const { transactions, status } = useAppSelector(selectTransaction);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const getContent = (): React.ReactElement => {
    if (status === 'loading') {
      return <Skeleton />;
    }

    return (
      <Grid container rowSpacing={2}>
        {
          transactions?.map(({ id, createdAt, name, amount }) => (
            <Grid item container key={id} columnSpacing={2}>
              <Grid item xs={4}>
                <Ellipsis text={name} />
              </Grid>
              <Grid item xs={4}>
                <Ellipsis text={`${symbol}${amount}`} />
              </Grid>
              <Grid item xs={4}>
                <Ellipsis text={createdAt} />
              </Grid>
            </Grid>
          ))
        }
      </Grid>
    );
  };

  const content = getContent();

  return (
    <Box>
      <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: 3 }}>Transactions</Typography>
      {content}
    </Box>
  );
};

export default Transactions;
