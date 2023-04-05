import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'store';
import { CategoryType } from 'shared/models';
import Skeleton from 'shared/components/Skeleton';
import Ellipsis from 'shared/components/Ellipsis';
import PageTitle from 'shared/components/PageTitle';
import Icon from 'shared/components/Icon';
import { selectCurrency, getTransactions, selectTransaction } from 'store/reducers';
import EmptyState from 'shared/components/EmptyState';

interface TransactionsProps { }

const Transactions: React.FC<TransactionsProps> = () => {
  const { symbol } = useAppSelector(selectCurrency);
  const { transactions, status } = useAppSelector(selectTransaction);
  const dispatch = useAppDispatch();
  const { palette: { primary, secondary, info: { contrastText } } } = useTheme();

  React.useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const getIconColor = (type: CategoryType): string => {
    return type === CategoryType.expense ? secondary.main : primary.main;
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
          transactions.map(({ id, createdAt, name, amount, icon, type, accountName, accountIcon }) => (
            <Grid item container key={id} columnSpacing={2} alignItems='center'>
              <Grid item xs={1} display='flex'>
                {icon && <Icon name={icon} sx={{ fontSize: 22, color: getIconColor(type) }}></Icon>}
              </Grid>
              <Grid item xs={3}>
                <Ellipsis text={name} fontSize={18} color={contrastText} />
              </Grid>
              <Grid item xs={2} display='flex' justifyContent='flex-end'>
                <Ellipsis text={`${symbol}${amount}`} color={contrastText} />
              </Grid>
              <Grid item xs={2} display='flex' justifyContent='flex-end'>
                <Ellipsis text={accountName} color={contrastText} />
              </Grid>
              <Grid item xs={1} display='flex'>
                {accountIcon && <Icon name={accountIcon} sx={{ fontSize: 22 }}></Icon>}
              </Grid>
              <Grid item xs={3} display='flex' justifyContent='flex-end'>
                <Ellipsis text={createdAt} color={contrastText} />
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
