import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from 'store';
import { Account as AccountModel, IconType } from 'shared/models';
import { ROUTES } from 'shared/constants';
import { getAccounts, selectAccount } from 'store/reducers';
import Skeleton from 'shared/components/Skeleton';
import PageTitle from 'shared/components/PageTitle';
import Icon from 'shared/components/Icon';
import Account from '../components/Account';

interface AccountListProps { }

const AccountList: React.FC<AccountListProps> = () => {
  const { accounts, status } = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  const handleAccountItemClick = ({ name, id }: { id: AccountModel['id'], name?: AccountModel['name'] }): void => {

  };

  const openNewAccountPage = (): void => {
    navigate(`${ROUTES.accounts.path}/new`);
  };

  const getContent = (): React.ReactElement => {
    if (status === 'loading' || status !== 'succeeded') {
      return <Skeleton />;
    }

    return (
      <Grid container columnGap={4} rowGap={4} sx={{ marginTop: 4 }}>
        {accounts.map(({ name, icon, id }) => (
          <Grid item key={id}>
            <Account id={id} title={name} icon={icon} onClick={handleAccountItemClick} />
          </Grid>
        ))}
        <Grid item>
          <IconButton color='primary' onClick={openNewAccountPage}>
            <Icon name={IconType.plus} sx={{ fontSize: 40 }}></Icon>
          </IconButton>
        </Grid>
      </Grid>
    );
  };

  const content = getContent();

  return (
    <Box>
      <PageTitle text='Accounts' />
      {content}
    </Box>
  );
};

export default AccountList;