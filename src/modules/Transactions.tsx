import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';
import { theme } from 'core/theme.config';
import { useAppDispatch, useAppSelector } from 'store';
import { CategoryType } from 'shared/models';
import Skeleton from 'shared/components/Skeleton';
import Ellipsis from 'shared/components/Ellipsis';
import PageTitle from 'shared/components/PageTitle';
import Icon from 'shared/components/Icon';
import { selectCurrency, getTransactions, selectTransaction } from 'store/reducers';

interface TransactionsProps { }

const Transactions: React.FC<TransactionsProps> = () => {
  const { symbol } = useAppSelector(selectCurrency);
  const { transactions, status } = useAppSelector(selectTransaction);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const getIconColor = (type: CategoryType): string => {
    return type === CategoryType.expense ? theme.palette.secondary.main : theme.palette.primary.main;
  };

  const getContent = (): React.ReactElement => {
    if (status === 'loading' || status !== 'succeeded') {
      return <Skeleton />;
    }

    return (
      <Grid container rowSpacing={2}>
        {
          transactions?.map(({ id, createdAt, name, amount, icon, type }) => (
            <Grid item container key={id} columnSpacing={2} alignItems='center'>
              <Grid item xs={1} display='flex'>
                {icon && <Icon name={icon} sx={{ fontSize: 22, color: getIconColor(type) }}></Icon>}
              </Grid>
              <Grid item xs={4}>
                <Ellipsis text={name} />
              </Grid>
              <Grid item xs={3} display='flex' justifyContent='flex-end'>
                <Ellipsis text={`${symbol}${amount}`} />
              </Grid>
              <Grid item xs={4} display='flex' justifyContent='flex-end'>
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
    <Box flexGrow={1}>
      <PageTitle text='Transactions' />
      {content}
    </Box>
  );
};

export default Transactions;
