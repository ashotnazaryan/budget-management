import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Icon from 'shared/components/Icon';
import { Account as AccountModel } from 'shared/models';
import Ellipsis from 'shared/components/Ellipsis';

interface AccountProps {
  // TODO: refactor this component to accept the full account object as an input
  id: AccountModel['id'];
  name: AccountModel['name'];
  icon: AccountModel['icon'];
  initialAmount: AccountModel['initialAmount'];
  symbol: AccountModel['currencySymbol'];
  isDefaultAccount?: AccountModel['isDefaultAccount'];
  onClick?: ({ id, name, isDefaultAccount }: { id: AccountModel['id'], name: AccountModel['name'], isDefaultAccount: AccountModel['isDefaultAccount'] }) => void;
}

const Account: React.FC<AccountProps> = ({ id, name, icon, initialAmount, symbol, isDefaultAccount, onClick }) => {
  const { palette: { primary: { main }, info: { contrastText } } } = useTheme();

  const onAccountClick = (): void => {
    if (onClick) {
      onClick({ id, name, isDefaultAccount });
    }
  };

  return (
    <Paper elevation={1} sx={{ paddingX: 2 }}>
      <Grid container display='flex' alignItems='center' justifyContent='space-between' columnSpacing={2}
        sx={{
          borderRadius: 1,
          width: '100%',
          minHeight: 40,
          cursor: 'pointer'
        }}
        onClick={onAccountClick}>
        <Grid item sm={1} xs={2} display='flex'>
          {icon && <Icon name={icon} sx={{ fontSize: 24, color: main }}></Icon>}
        </Grid>
        <Grid item sm={7} xs={6} display='flex'>
          <Ellipsis color={contrastText} text={name} />
        </Grid>
        <Grid item sm={4} xs={4} display='flex' justifyContent='flex-end'>
          <Ellipsis color={contrastText} text={`${symbol}${initialAmount}`} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Account;
