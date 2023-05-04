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

interface AccountListProps { }

const AccountList: React.FC<AccountListProps> = () => {
  const dispatch = useAppDispatch();
  const { accounts, status } = useAppSelector(selectAccount);
  const { balance, balanceStatus } = useAppSelector(selectSummary);
  const navigate = useNavigate();
  const { t } = useTranslation();

  React.useEffect(() => {
    if (status === 'idle' || status === 'failed') {
      dispatch(getAccounts());
    }
  }, [dispatch, status]);

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
    if (balanceStatus === 'idle' || balanceStatus === 'failed') {
      dispatch(getBalance());
    }
  }, [dispatch, balanceStatus]);

  const renderContent = (): React.ReactElement => {
    if (status === 'loading' || status !== 'succeeded') {
      return <Skeleton type='list' />;
    }

    if (!accounts?.length) {
      return <EmptyState text={t('ACCOUNTS.EMPTY_TEXT')!} />;
    }

    return (
      <Grid container rowGap={2} sx={{ marginTop: 4 }}>
        {accounts.map((account) => (
          <Grid item key={account.id} xs={12}>
            <Account data={getAccountData(account)} onClick={handleAccountItemClick} />
          </Grid>
        ))}
        <Grid item xs={12} display='flex' justifyContent='flex-end'>
          <IconButton color='primary' onClick={openNewAccountPage} sx={{ alignSelf: 'flex-end' }}>
            <Icon name={IconType.plus} sx={{ fontSize: 40 }}></Icon>
          </IconButton>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box flexGrow={1}>
      <PageTitle text={t('ACCOUNTS.PAGE_TITLE')} />
      <TransferButtons balance={balance} sx={{ marginBottom: 4 }} />
      {renderContent()}
    </Box>
  );
};

export default AccountList;