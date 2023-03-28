import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';
import { useAppDispatch, useAppSelector } from 'store';
import { getTransactions, selectCurrency, selectTransaction } from 'store/reducers';
import Skeleton from 'shared/components/Skeleton';
import Ellipsis from 'shared/components/Ellipsis';
import PageTitle from 'shared/components/PageTitle';

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
              <Grid item xs={3} display='flex' justifyContent='flex-end'>
                <Ellipsis text={`${symbol}${amount}`} />
              </Grid>
              <Grid item xs={5} display='flex' justifyContent='flex-end'>
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
      <PageTitle text='Transactions' />
      {content}
    </Box>
  );
};

export default Transactions;
