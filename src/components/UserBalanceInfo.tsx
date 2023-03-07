import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { theme } from 'core/theme.config';

interface UserBalanceInfoProps {
  fullName: string;
  balance: number;
  currency: string;
  avatar?: string;
}

const UserBalanceInfo: React.FC<UserBalanceInfoProps> = ({ avatar, currency, fullName = '', balance = 0 }) => {
  return (
    <Grid container alignItems='center' columnSpacing={2}>
      <Grid item xs={3}>
        <Avatar alt={fullName} src={avatar} sx={{ marginRight: 1, border: `1px solid ${theme.palette.primary.main}` }} />
      </Grid>
      <Grid item container xs={9}>
        {/* TODO: Move common styles to a shared level */}
        <Grid item xs={12} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{fullName}</Grid>
        <Grid item xs={12} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Balance: {currency}{balance}</Grid>
      </Grid>
    </Grid>
  );
};

export default UserBalanceInfo;
