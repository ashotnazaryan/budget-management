import * as React from 'react';
import Icon from 'shared/components/Icon';
import { theme } from 'core/theme.config';
import { Account as AccountModel } from 'shared/models';
import Grid from '@mui/material/Grid';
import Ellipsis from 'shared/components/Ellipsis';

interface AccountProps {
  name: AccountModel['name'];
  icon: AccountModel['icon'];
  initialAmount: AccountModel['initialAmount'];
  symbol: AccountModel['currencySymbol'];
}

const Account: React.FC<AccountProps> = ({ name, icon, initialAmount, symbol }) => {
  return (
    <Grid container display='flex' alignItems='center' justifyContent='space-between'
      sx={{
        paddingX: 4,
        paddingY: 2,
        marginY: 1,
        borderRadius: 1,
        width: '100%',
        minHeight: 40
      }}>
      <Grid item xs={1} display='flex'>
        {icon && <Icon name={icon} sx={{ fontSize: 24, color: theme.palette.primary.main }}></Icon>}
      </Grid>
      <Grid item xs={7} display='flex'>
        <Ellipsis text={name} />
      </Grid>
      <Grid item xs={4} display='flex' justifyContent='flex-end'>
        <Ellipsis text={`${symbol}${initialAmount}`} />
      </Grid>
    </Grid>
  );
};

export default Account;
