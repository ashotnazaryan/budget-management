import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'core/i18n';
import Ellipsis from 'shared/components/Ellipsis';
import Balance from 'shared/components/Balance';

interface UserBalanceInfoProps {
  fullName: string;
  balance: string;
  avatar?: string;
}

const UserBalanceInfo: React.FC<UserBalanceInfoProps> = ({ avatar, fullName = '', balance = '0' }) => {
  const { palette: { secondary: { main } } } = useTheme();
  const { t } = useTranslation();

  return (
    <Grid container alignItems='center' columnSpacing={2}>
      <Grid item>
        <Avatar alt={fullName} src={avatar} sx={{ width: 64, height: 64, marginRight: 1, border: `1px solid ${main}` }} />
      </Grid>
      <Grid item container xs={8}>
        <Grid item xs={12}>
          <Ellipsis text={fullName} sx={{ fontSize: 18 }} />
        </Grid>
        <Grid item xs={12} display='flex' alignItems='center'>
          <Ellipsis text={t('COMMON.BALANCE')} sx={{ fontSize: 16, marginRight: 1 }} />
          <Balance balance={balance} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserBalanceInfo;
