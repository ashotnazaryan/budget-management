import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Locale } from 'shared/models';
import { mapLocaleIsoToCountryCode } from 'shared/helpers';
import CountryFlag from './CountryFlag';

interface LocaleInfoItemProps {
  locale: Pick<Locale, 'iso' | 'displayName'>;
  color?: string;
}

const LocaleInfoItem: React.FC<LocaleInfoItemProps> = ({ locale: { iso, displayName }, color }) => {
  const { palette: { info: { contrastText } } } = useTheme();
  const textColor = color || contrastText;

  return (
    <Grid item display='flex'>
      <CountryFlag code={mapLocaleIsoToCountryCode(iso)} />
      <Typography color={textColor} sx={{ marginLeft: 2 }}>{displayName}</Typography>
    </Grid>
  );
};

export default LocaleInfoItem;
