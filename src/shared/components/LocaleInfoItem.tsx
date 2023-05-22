import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { Locale } from 'shared/models';
import { mapLocaleIsoToCountryCode } from 'shared/helpers';
import CountryFlag from './CountryFlag';

type LocaleInfoItemProps = {
  locale: Pick<Locale, 'iso' | 'displayName'>;
  color?: string;
} & TypographyProps;

const LocaleInfoItem: React.FC<LocaleInfoItemProps> = ({ locale: { iso, displayName }, color, ...props }) => {
  const { palette: { info: { contrastText } } } = useTheme();
  const textColor = color || contrastText;

  return (
    <Grid item display='flex' alignItems='center'>
      <CountryFlag code={mapLocaleIsoToCountryCode(iso)} />
      <Typography {...props} color={textColor} sx={{ ...props.sx, marginLeft: 2 }}>{displayName}</Typography>
    </Grid>
  );
};

export default LocaleInfoItem;
