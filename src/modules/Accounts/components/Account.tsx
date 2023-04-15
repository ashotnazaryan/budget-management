import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { Account as AccountModel } from 'shared/models';
import { isPositiveString } from 'shared/helpers';
import Icon from 'shared/components/Icon';
import Ellipsis from 'shared/components/Ellipsis';

interface AccountProps {
  data: AccountModel;
  onClick?: (data: AccountModel) => void;
}

const Account: React.FC<AccountProps> = ({ data, onClick }) => {
  const { palette: { primary: { main, contrastText }, error } } = useTheme();
  const { name, icon, balance, currencySymbol } = data;

  const onAccountClick = (): void => {
    if (onClick) {
      onClick(data);
    }
  };

  return (
    <Paper elevation={1} sx={{ paddingX: 2, backgroundColor: main }}>
      <Grid container display='flex' alignItems='center' justifyContent='space-between' columnSpacing={2}
        sx={{
          borderRadius: 1,
          width: '100%',
          minHeight: 40,
          cursor: 'pointer'
        }}
        onClick={onAccountClick}>
        <Grid item sm={1} xs={2} display='flex'>
          {icon && <Icon name={icon} sx={{ fontSize: 24, color: contrastText }}></Icon>}
        </Grid>
        <Grid item sm={7} xs={6} display='flex'>
          <Ellipsis color={contrastText} text={name} />
        </Grid>
        <Grid item sm={4} xs={4} display='flex' justifyContent='flex-end'>
          <Ellipsis color={isPositiveString(balance) ? contrastText : error.main} text={`${currencySymbol}${balance}`} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Account;
