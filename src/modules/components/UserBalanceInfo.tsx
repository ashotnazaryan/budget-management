import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { Currency } from 'shared/models';
import Ellipsis from 'shared/components/Ellipsis';
import Balance from 'shared/components/Balance';

interface UserBalanceInfoProps {
  fullName: string;
  balance: string;
  currencySymbol: Currency['symbol'];
  avatar?: string;
}

const UserBalanceInfo: React.FC<UserBalanceInfoProps> = ({ avatar, currencySymbol, fullName = '', balance = '0' }) => {
  const { palette: { primary: { main } } } = useTheme();
  const { t } = useTranslation();

  return (
    <Grid container alignItems='center' columnSpacing={2}>
      <Grid item xs={4}>
        <Avatar alt={fullName} src={avatar} sx={{ width: 64, height: 64, marginRight: 1, border: `1px solid ${main}` }} />
      </Grid>
      <Grid item container xs={8}>
        <Grid item xs={12}>
          <Ellipsis text={fullName} sx={{ fontSize: { sm: 18, xs: 16 } }} />
        </Grid>
        <Grid item xs={12} display='flex' alignItems='center'>
          <Ellipsis text={t('COMMON.BALANCE')} sx={{ fontSize: { sm: 16, xs: 14 }, marginRight: 1 }} />
          <Balance balance={balance} currencySymbol={currencySymbol} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserBalanceInfo;
