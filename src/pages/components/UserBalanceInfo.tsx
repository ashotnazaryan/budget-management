import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { theme } from 'core/theme.config';
import Ellipsis from 'shared/components/Ellipsis';

interface UserBalanceInfoProps {
  fullName: string;
  balance: string;
  currency: string;
  avatar?: string;
}

const UserBalanceInfo: React.FC<UserBalanceInfoProps> = ({ avatar, currency, fullName = '', balance = 0 }) => {
  return (
    <Grid container alignItems='center' columnSpacing={2}>
      <Grid item sm={4} xs={3}>
        <Avatar alt={fullName} src={avatar} sx={{ width: 64, height: 64, marginRight: 1, border: `1px solid ${theme.palette.primary.main}` }} />
      </Grid>
      <Grid item container sm={8} xs={9}>
        <Grid item xs={12}>
          <Ellipsis text={fullName} />
        </Grid>
        <Grid item xs={12}>
          <Ellipsis text={`Balance: ${currency}${balance}`} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserBalanceInfo;
