import * as React from 'react';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useAppDispatch, useAppSelector } from 'store';
import { Account as AccountModel } from 'shared/models';
import { getAccounts, selectAccount } from 'store/reducers';
import Skeleton from 'shared/components/Skeleton';
import PageTitle from 'shared/components/PageTitle';
import Account from './components/Account';

interface AccountsProps { }

const Accounts: React.FC<AccountsProps> = () => {
  const { accounts, status } = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  const handleAccountItemClick = ({ accountId, name }: { accountId: AccountModel['id'], name: AccountModel['name'] }): void => {

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

export default Accounts;
