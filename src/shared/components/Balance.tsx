import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { isPositiveString } from 'shared/helpers';
import Ellipsis from 'shared/components/Ellipsis';
import { Currency } from 'shared/models';

interface BalanceProps {
  balance: string;
  currencySymbol: Currency['symbol'];
}

const Balance: React.FC<BalanceProps> = ({ currencySymbol, balance = '0' }) => {
  const { palette: { info: { contrastText }, error } } = useTheme();
  const { t } = useTranslation();

  return (
    <Ellipsis text={`${t('COMMON.BALANCE')}: ${currencySymbol}${balance}`} color={isPositiveString(balance) ? contrastText : error.main} sx={{ fontSize: { sm: 16, xs: 14 } }} />
  );
};

export default Balance;
