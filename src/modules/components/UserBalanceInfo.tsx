import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { isPositiveString } from 'shared/helpers';
import Ellipsis from 'shared/components/Ellipsis';

interface UserBalanceInfoProps {
  fullName: string;
  balance: string;
  currency: string;
  avatar?: string;
}

const UserBalanceInfo: React.FC<UserBalanceInfoProps> = ({ avatar, currency, fullName = '', balance = '0' }) => {
  const { palette: { primary: { main }, info: { contrastText }, error } } = useTheme();

  return (
    <Grid container alignItems='center' columnSpacing={2}>
      <Grid item sm={4} xs={3}>
        <Avatar alt={fullName} src={avatar} sx={{ width: { sm: 64, xs: 48 }, height: { sm: 64, xs: 48 }, marginRight: 1, border: `1px solid ${main}` }} />
      </Grid>
      <Grid item container sm={8} xs={9}>
        <Grid item xs={12}>
          <Ellipsis text={fullName} sx={{ fontSize: { sm: 18, xs: 16 } }} />
        </Grid>
        <Grid item xs={12}>
          <Ellipsis text={`Balance: ${currency}${balance}`} color={isPositiveString(balance) ? contrastText : error.main} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserBalanceInfo;
