import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'core/i18n';
import { IconType, Summary } from 'shared/models';
import { ROUTES } from 'shared/constants';
import Icon from 'shared/components/Icon';
import Balance from 'shared/components/Balance';
import Button from 'shared/components/Button';
import Box, { BoxProps } from '@mui/material/Box';

type TransferButtonsProps = {
  balance: Summary['balance'];
} & BoxProps

const TransferButtons: React.FC<TransferButtonsProps> = ({ balance, ...props }) => {
  const { palette: { info: { contrastText } } } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const openAccountTransferPage = (): void => {
    navigate(`${ROUTES.transfers.path}/new`);
  };

  const openTransferListPage = (): void => {
    navigate(`${ROUTES.transfers.path}`);
  };

  return (
    <Box
      sx={{ ...props.sx, display: 'flex', flexDirection: 'column', paddingBottom: 3, borderBottom: (theme) => `1px solid ${theme.palette.secondary.main}` }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 3 }}>
        <Typography noWrap color={contrastText} fontSize={18} sx={{ marginRight: 1 }}>{t('COMMON.BALANCE')}:</Typography>
        <Balance balance={balance} fontSize={18} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: { sm: 'row', xs: 'column' }, alignItems: 'center', justifyContent: 'space-between', gap: 3 }}>
        <Button
          aria-label='New transfer'
          color='secondary'
          variant='contained'
          startIcon={<Icon name={IconType.currencyExchange}></Icon>}
          sx={{ width: { sm: 'auto', xs: '100%' }, fontSize: 14 }}
          onClick={openAccountTransferPage}>
          {t('TRANSFERS.NEW_TRANSFER')}
        </Button>
        <Button
          aria-label='Transfer history'
          color='secondary'
          startIcon={<Icon name={IconType.history}></Icon>}
          sx={{ width: { sm: 'auto', xs: '100%' }, fontSize: 14 }}
          onClick={openTransferListPage}>
          {t('TRANSFERS.TRANSFER_HISTORY')}
        </Button>
      </Box>
    </Box>
  );
};

export default TransferButtons;
