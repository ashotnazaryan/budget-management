import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'core/i18n';
import { useAppDispatch, useAppSelector } from 'store';
import { getTransactions, resetSummaryStatus, resetTransactionsStatus, selectSettings, selectSummary, selectTransaction, setActivePeriodFilter } from 'store/reducers';
import { Period, Transaction as TransactionModel } from 'shared/models';
import { PERIOD_OPTIONS, ROUTES } from 'shared/constants';
import Skeleton from 'shared/components/Skeleton';
import PageTitle from 'shared/components/PageTitle';
import EmptyState from 'shared/components/EmptyState';
import Transaction from '../components/Transaction';

const TransactionList: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { transactions, status } = useAppSelector(selectTransaction);
  const { activePeriodFilter } = useAppSelector(selectSummary);
  const { defaultPeriod } = useAppSelector(selectSettings);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const periodOptions = PERIOD_OPTIONS;

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(getTransactions(activePeriodFilter));
    }
  }, [dispatch, status, activePeriodFilter]);

  const handleTransactionClick = ({ id, name }: TransactionModel): void => {
    navigate(`${ROUTES.transactions.path}/view/${name}`, { state: { id } });
  };

  const handlePeriodChange = (event: SelectChangeEvent): void => {
    const period = event.target.value as Period;

    dispatch(setActivePeriodFilter(period));
    dispatch(resetTransactionsStatus());
    dispatch(resetSummaryStatus());
  };

  const getTransactionData = (data: TransactionModel): TransactionModel => {
    return {
      ...data,
      name: data.nameKey ? t(data.nameKey) : data.name,
      accountName: data.accountNameKey ? t(data.accountNameKey) : data.accountName
    };
  };

  const renderContent = (): React.ReactElement => {
    if (status === 'loading') {
      return (
        <Grid item xs={12}>
          <Skeleton type='list' />
        </Grid>
      );
    }

    if ((status === 'failed' || status === 'succeeded') && !transactions?.length) {
      return (
        <Grid item xs={12}>
          <EmptyState text={t('TRANSACTIONS.EMPTY_TEXT')} />
        </Grid>
      );
    }

    return (
      <>
        {
          transactions.map((transaction) => (
            <Grid item key={transaction.id} xs={12}>
              <Transaction data={getTransactionData(transaction)} onClick={handleTransactionClick} />
            </Grid>
          ))
        }
      </>
    );
  };

  return (
    <Box flexGrow={1}>
      <PageTitle text={t('TRANSACTIONS.PAGE_TITLE')} />
      <Box sx={{ marginBottom: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Select
          variant='outlined'
          value={activePeriodFilter || defaultPeriod}
          onChange={handlePeriodChange}
        >
          {periodOptions.map(({ value, label }) => (
            <MenuItem value={value} key={value}>{t(label)}</MenuItem>
          ))}
        </Select>
      </Box>
      <Grid container rowGap={2}>
        {renderContent()}
      </Grid>
    </Box>
  );
};

export default TransactionList;
