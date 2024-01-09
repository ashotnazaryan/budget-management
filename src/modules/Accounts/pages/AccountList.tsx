import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'core/i18n';
import { useAppDispatch, useAppSelector } from 'store';
import { IconType, Account as AccountModel } from 'shared/models';
import { ROUTES } from 'shared/constants';
import { getAccounts, getBalance, selectAccount, selectSummary } from 'store/reducers';
import Skeleton from 'shared/components/Skeleton';
import PageTitle from 'shared/components/PageTitle';
import Icon from 'shared/components/Icon';
import EmptyState from 'shared/components/EmptyState';
import Account from '../components/Account';
import TransferButtons from '../components/TransferButtons';

const AccountList: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { accounts, status } = useAppSelector(selectAccount);
  const { balance, balanceStatus } = useAppSelector(selectSummary);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const openNewAccountPage = (): void => {
    navigate(`${ROUTES.accounts.path}/new`);
  };

  const handleAccountItemClick = ({ id, name }: AccountModel): void => {
    navigate(`${ROUTES.accounts.path}/view/${name}`, { state: { id } });
  };

  const getAccountData = (data: AccountModel): AccountModel => {
    return {
      ...data,
      name: data.nameKey ? t(data.nameKey) : data.name
    };
  };

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(getAccounts());
    }
  }, [dispatch, status]);

  React.useEffect(() => {
    if (balanceStatus === 'idle') {
      dispatch(getBalance());
    }
  }, [dispatch, balanceStatus]);

  const renderContent = (): React.ReactElement => {
    if (status === 'loading') {
      return (
        <Grid item xs={12}>
          <Skeleton type='list' />
        </Grid>
      );
    }

    if ((status === 'failed' || status === 'succeeded') && !accounts?.length) {
      return (
        <Grid item xs={12}>
          <EmptyState text={t('ACCOUNTS.EMPTY_TEXT')} />
        </Grid>
      );
    }

    return (
      <>
        {accounts.map((account) => (
          <Grid item key={account.id} xs={12}>
            <Account data={getAccountData(account)} onClick={handleAccountItemClick} />
          </Grid>
        ))}
      </>
    );
  };

  return (
    <Box flexGrow={1}>
      <TransferButtons balance={balance} sx={{ marginTop: 2, marginBottom: 4 }} />
      <PageTitle text={t('ACCOUNTS.PAGE_TITLE')} sx={{ marginBottom: 4 }} />
      <Grid container rowGap={2} sx={{ marginTop: 4 }}>
        {renderContent()}
        <Grid item xs={12} display='flex' justifyContent='flex-end'>
          <IconButton aria-label='Add account' color='primary' onClick={openNewAccountPage} sx={{ alignSelf: 'flex-end' }}>
            <Icon name={IconType.plus} sx={{ fontSize: 40 }}></Icon>
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountList;