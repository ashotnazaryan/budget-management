import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Icon from 'shared/components/Icon';
import { Account as AccountModel } from 'shared/models';
import Ellipsis from 'shared/components/Ellipsis';

interface AccountProps {
  name: AccountModel['name'];
  icon: AccountModel['icon'];
  initialAmount: AccountModel['initialAmount'];
  symbol: AccountModel['currencySymbol'];
}

const Account: React.FC<AccountProps> = ({ name, icon, initialAmount, symbol }) => {
  const { palette: { primary: { main }, info: { contrastText } } } = useTheme();

  return (
    <Grid container display='flex' alignItems='center' justifyContent='space-between' columnSpacing={2}
      sx={{
        borderRadius: 1,
        width: '100%',
        minHeight: 40
      }}>
      <Grid item xs={1} display='flex'>
        {icon && <Icon name={icon} sx={{ fontSize: 24, color: main }}></Icon>}
      </Grid>
      <Grid item xs={7} display='flex'>
        <Ellipsis color={contrastText} text={name} />
      </Grid>
      <Grid item xs={4} display='flex' justifyContent='flex-end'>
        <Ellipsis color={contrastText} text={`${symbol}${initialAmount}`} />
      </Grid>
    </Grid>
  );
};

export default Account;
