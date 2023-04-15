import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';
import { useAppDispatch, useAppSelector } from 'store';
import { getTransactions, selectTransaction } from 'store/reducers';
import { Transaction as TransactionModel } from 'shared/models';
import { ROUTES } from 'shared/constants';
import Skeleton from 'shared/components/Skeleton';
import PageTitle from 'shared/components/PageTitle';
import EmptyState from 'shared/components/EmptyState';
import Transaction from '../components/Transaction';

interface TransactionListProps { }

const TransactionList: React.FC<TransactionListProps> = () => {
  const dispatch = useAppDispatch();
  const { transactions, status } = useAppSelector(selectTransaction);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      return <EmptyState text={t('TRANSACTIONS.EMPTY_TEXT')!} />;
    }

    return (
      <Grid container rowSpacing={2}>
        {
          transactions.map((transaction) => (
            <Grid item key={transaction.id} xs={12}>
              <Transaction data={transaction} onClick={handleTransactionClick} />
            </Grid>
          ))
        }
      </Grid>
    );
  };

  const content = getContent();

  return (
    <Box flexGrow={1}>
      <PageTitle text={t('TRANSACTIONS.PAGE_TITLE')} />
      {content}
    </Box>
  );
};

export default TransactionList;
