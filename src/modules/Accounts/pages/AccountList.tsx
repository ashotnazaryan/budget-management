import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from 'store';
import { IconType, Account as AccountModel } from 'shared/models';
import { ROUTES } from 'shared/constants';
import { getAccounts, selectAccount } from 'store/reducers';
import Skeleton from 'shared/components/Skeleton';
import PageTitle from 'shared/components/PageTitle';
import Icon from 'shared/components/Icon';
import EmptyState from 'shared/components/EmptyState';
import Account from '../components/Account';

interface AccountListProps { }

const AccountList: React.FC<AccountListProps> = () => {
  const dispatch = useAppDispatch();
  const { accounts, status } = useAppSelector(selectAccount);
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
    navigate(`${ROUTES.accounts.path}/edit/${name}`, { state: { id } });
  };

  const getAccountData = (data: AccountModel): AccountModel => {
    return {
      ...data,
      name: data.nameKey ? t(data.nameKey) : data.name
    };
  };

  const getContent = (): React.ReactElement => {
    if (status === 'loading' || status !== 'succeeded') {
      return <Skeleton />;
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

  const content = getContent();

  return (
    <Box flexGrow={1}>
      <PageTitle text={t('ACCOUNTS.PAGE_TITLE')} />
      {content}
    </Box>
  );
};

export default AccountList;