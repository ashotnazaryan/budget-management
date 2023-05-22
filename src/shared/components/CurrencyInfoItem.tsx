import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { Currency } from 'shared/models';
import { mapCurrencyIsoToCountryCode } from 'shared/helpers';
import CountryFlag from './CountryFlag';

type CurrencyInfoItemProps = {
  currency: Currency;
  color?: string;
} & TypographyProps;

const CurrencyInfoItem: React.FC<CurrencyInfoItemProps> = ({ currency: { iso, symbol, name, nameKey }, color, ...props }) => {
  const { t } = useTranslation();
  const { palette: { info: { contrastText } } } = useTheme();
  const textColor = color || contrastText;

  return (
    <Grid item display='flex' alignItems='center'>
      <CountryFlag code={mapCurrencyIsoToCountryCode(iso)} />
      <Typography {...props} color={textColor} sx={{ ...props.sx, marginLeft: 2 }}>{nameKey ? t(nameKey) : name} ({symbol})</Typography>
    </Grid>
  );
};

export default CurrencyInfoItem;
