import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';
import { useAppDispatch, useAppSelector } from 'store';
import { getTransactions, selectCurrency, selectTransaction } from 'store/reducers';
import { Transaction as TransactionModel } from 'shared/models';
import { ROUTES } from 'shared/constants';
import Skeleton from 'shared/components/Skeleton';
import PageTitle from 'shared/components/PageTitle';
import EmptyState from 'shared/components/EmptyState';
import Transaction from '../components/Transaction';
interface TransactionListProps { }

const TransactionList: React.FC<TransactionListProps> = () => {
  const dispatch = useAppDispatch();
  const { symbol } = useAppSelector(selectCurrency);
  const { transactions, status } = useAppSelector(selectTransaction);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(getTransactions());
    }
  }, [dispatch, status]);

  const handleTransactionClick = ({ id, name }: TransactionModel): void => {
    navigate(`${ROUTES.transactions.path}/edit/${name}`, { state: { id } });
  };

  const getContent = (): React.ReactElement => {
    if (status === 'loading' || status !== 'succeeded') {
      return <Skeleton />;
    }

    if (!transactions?.length) {
      return <EmptyState text='No transactions available' />;
    }

    return (
      <Grid container rowSpacing={2}>
        {
          transactions.map((transaction) => (
            <Grid item key={transaction.id} xs={12}>
              <Transaction data={transaction} symbol={symbol} onClick={handleTransactionClick} />
            </Grid>
          ))
        }
      </Grid>
    );
  };

  const content = getContent();

  return (
    <Box flexGrow={1}>
      <PageTitle text='Transactions' />
      {content}
    </Box>
  );
};

export default TransactionList;
