import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Account as AccountModel } from 'shared/models';
import Icon from 'shared/components/Icon';
import Balance from 'shared/components/Balance';

interface AccountProps {
  data: AccountModel;
  onClick?: (data: AccountModel) => void;
}

const Account: React.FC<AccountProps> = ({ data, onClick }) => {
  const { palette: { primary: { main, contrastText } } } = useTheme();
  const { name, icon, balance } = data;

  const onAccountClick = (): void => {
    if (onClick) {
      onClick(data);
    }
  };

  return (
    <Paper elevation={1} sx={{ paddingX: 2, backgroundColor: main }}>
      <Grid container display='flex' alignItems='center' justifyContent='space-between' flexGrow={1} columnSpacing={2}
        sx={{
          borderRadius: 1,
          minHeight: 40,
          cursor: 'pointer'
        }}
        onClick={onAccountClick}>
        <Grid item xs={1} display='flex'>
          {icon && <Icon name={icon} sx={{ fontSize: 24, color: contrastText }}></Icon>}
        </Grid>
        <Grid item xs={7} display='flex'>
          <Typography noWrap color={contrastText}>{name}</Typography>
        </Grid>
        <Grid item xs={4} display='flex' justifyContent='flex-end'>
          <Balance balance={balance} positiveColor={contrastText} fontSize={{ sm: 16, xs: 14 }} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Account;
