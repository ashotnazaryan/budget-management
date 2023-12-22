import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'core/i18n';
import Balance from 'shared/components/Balance';

interface UserBalanceInfoProps {
  fullName: string;
  balance: string;
  avatar?: string;
  onAvatarClick?: () => void;
}

const UserBalanceInfo: React.FC<UserBalanceInfoProps> = ({ avatar, onAvatarClick, fullName = '', balance = '0' }) => {
  const { palette: { secondary: { main } } } = useTheme();
  const { t } = useTranslation();

  return (
    <Grid container alignItems='center' columnSpacing={2}>
      <Grid item>
        <Avatar alt={fullName} src={avatar} onClick={onAvatarClick} sx={{ width: 64, height: 64, marginRight: 1, border: `1px solid ${main}`, cursor: 'pointer' }} />
      </Grid>
      <Grid item container xs={8}>
        <Grid item xs={12}>
          <Typography noWrap fontSize={18}>{fullName}</Typography>
        </Grid>
        <Grid item xs={12} display='flex' alignItems='center'>
          <Typography noWrap fontSize={16} sx={{ marginRight: 1 }}>{t('COMMON.BALANCE')}</Typography>
          <Balance balance={balance} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserBalanceInfo;
