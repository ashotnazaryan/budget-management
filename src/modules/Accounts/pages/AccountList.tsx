import * as React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const { accounts, status } = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(getAccounts());
    }
  }, [dispatch, status]);

  const openNewAccountPage = (): void => {
    navigate(`${ROUTES.accounts.path}/new`);
  };

  const handleAccountItemClick = ({ id, name }: { id: AccountModel['id'], name: AccountModel['name'] }): void => {
    navigate(`${ROUTES.accounts.path}/edit/${name}`, { state: { id } });
  };

  const getContent = (): React.ReactElement => {
    if (status === 'loading' || status !== 'succeeded') {
      return <Skeleton />;
    }

    if (!accounts?.length) {
      return <EmptyState text='No accounts available' />;
    }

    return (
      <Grid container rowGap={2} sx={{ marginTop: 4 }}>
        {accounts.map(({ name, icon, id, balance, currencySymbol }) => (
          <Grid item key={id} xs={12}>
            <Account id={id} name={name} balance={balance} icon={icon} symbol={currencySymbol} onClick={handleAccountItemClick} />
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
      <PageTitle text='Accounts' />
      {content}
    </Box>
  );
};

export default AccountList;