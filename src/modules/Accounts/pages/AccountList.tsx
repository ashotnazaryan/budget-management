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
import Snackbar from 'shared/components/Snackbar';
import Account from '../components/Account';

interface AccountListProps { }

const AccountList: React.FC<AccountListProps> = () => {
  const { accounts, status } = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  const openNewAccountPage = (): void => {
    navigate(`${ROUTES.accounts.path}/new`);
  };

  const handleAccountItemClick = ({ id, name, isDefaultAccount }: { id: AccountModel['id'], name: AccountModel['name'], isDefaultAccount: AccountModel['isDefaultAccount'] }): void => {
    if (isDefaultAccount) {
      setShowSnackbar(true);

      return;
    }

    navigate(`${ROUTES.accounts.path}/edit/${name}`, { state: { id } });
  };

  const handleSnackbarClose = (): void => {
    setShowSnackbar(false);
  };

  const getContent = (): React.ReactElement => {
    if (status === 'loading' || status !== 'succeeded') {
      return <Skeleton />;
    }

    if (!accounts?.length) {
      return <EmptyState />;
    }

    return (
      <Grid container rowGap={4} sx={{ marginTop: 4 }}>
        {accounts.map(({ name, icon, id, initialAmount, isDefaultAccount, currencySymbol }) => (
          <Grid item key={id} xs={12}>
            <Account id={id} name={name} initialAmount={initialAmount} icon={icon} symbol={currencySymbol} isDefaultAccount={isDefaultAccount} onClick={handleAccountItemClick} />
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
      <Snackbar open={showSnackbar} onClose={handleSnackbarClose} text='You cannot edit the default account' type='info' />
    </Box>
  );
};

export default AccountList;