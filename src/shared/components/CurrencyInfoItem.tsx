import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Currency } from 'shared/models';
import { mapCurrencyIsoToCountryCode } from 'shared/helpers';
import CountryFlag from './CountryFlag';

interface CurrencyInfoItemProps {
  currency: Currency;
  color?: string;
}

const CurrencyInfoItem: React.FC<CurrencyInfoItemProps> = ({ currency: { iso, symbol, name, nameKey }, color }) => {
  const { t } = useTranslation();
  const { palette: { info: { contrastText } } } = useTheme();
  const textColor = color || contrastText;

  return (
    <Grid item display='flex'>
      <CountryFlag code={mapCurrencyIsoToCountryCode(iso)} />
      <Typography color={textColor} sx={{ marginLeft: 2 }}>{nameKey ? t(nameKey) : name} ({symbol})</Typography>
    </Grid>
  );
};

export default CurrencyInfoItem;
