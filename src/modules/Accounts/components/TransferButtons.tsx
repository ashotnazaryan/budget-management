import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Grid, { GridProps } from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { Currency, IconType, Summary } from 'shared/models';
import { ROUTES } from 'shared/constants';
import Icon from 'shared/components/Icon';
import Ellipsis from 'shared/components/Ellipsis';
import Balance from 'shared/components/Balance';
import Button from 'shared/components/Button';

type TransferButtonsProps = {
  balance: Summary['balance'];
  currencySymbol: Currency['symbol'];
} & GridProps

const TransferButtons: React.FC<TransferButtonsProps> = ({ balance, currencySymbol, ...props }) => {
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
    <Grid container rowGap={2} sx={{ ...props.sx }}>
      <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
        <Ellipsis text={t('COMMON.BALANCE')} color={contrastText} fontSize={18} sx={{ marginRight: 1 }} />
        <Balance balance={balance} currencySymbol={currencySymbol} fontSize={18} />
      </Grid>
      <Grid container item display='flex' justifyContent='space-between' columnSpacing={2} rowGap={2}>
        <Grid item sm={6} xs={12} display='flex' justifyContent='center'>
          <Button
            color='secondary'
            variant='contained'
            startIcon={<Icon name={IconType.currencyExchange}></Icon>}
            sx={{ width: { sm: 'auto', xs: '100%' }, fontSize: 14 }}
            onClick={openAccountTransferPage}>
            {t('TRANSFERS.NEW_TRANSFER')}
          </Button>
        </Grid>
        <Grid item sm={6} xs={12} display='flex' justifyContent='center'>
          <Button
            color='secondary'
            variant='outlined'
            startIcon={<Icon name={IconType.history}></Icon>}
            sx={{ width: { sm: 'auto', xs: '100%' }, fontSize: 14 }}
            onClick={openTransferListPage}>
            {t('TRANSFERS.TRANSFER_HISTORY')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TransferButtons;