import * as React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'core/i18n';
import { useAppDispatch, useAppSelector } from 'store';
import { closeSidebar, selectSettings } from 'store/reducers';
import { ROUTES } from 'shared/constants';
import CurrencyInfoItem from 'shared/components/CurrencyInfoItem';
import LocaleInfoItem from 'shared/components/LocaleInfoItem';

interface SideBarSettingsPreviewProps { }

const SideBarSettingsPreview: React.FC<SideBarSettingsPreviewProps> = () => {
  const dispatch = useAppDispatch();
  const { defaultCurrency, locale } = useAppSelector(selectSettings);
  const { palette: { info: { contrastText }, secondary: { main } } } = useTheme();
  const { t } = useTranslation();

  const handleNavigation = (): void => {
    dispatch(closeSidebar());
  };

  return (
    <Grid item container sx={{ paddingY: 2, paddingX: 4, borderBottom: `1px solid ${main}` }} rowSpacing={3}>
      <Grid item xs={12}>
        <Link onClick={handleNavigation} to={ROUTES.settings.path} style={{ display: 'block' }}>
          <Grid item container columnSpacing={4}>
            <Grid item>
              <Typography color={contrastText}>{t('SIDEBAR.CURRENCY')}:</Typography>
            </Grid>
            <Grid item>
              <CurrencyInfoItem currency={defaultCurrency} />
            </Grid>
          </Grid>
        </Link>
      </Grid>
      <Grid item xs={12}>
        <Link onClick={handleNavigation} to={ROUTES.settings.path} style={{ display: 'block' }}>
          <Grid item container columnSpacing={4}>
            <Grid item>
              <Typography color={contrastText}>{t('SIDEBAR.LANGUAGE')}:</Typography>
            </Grid>
            <Grid item>
              <LocaleInfoItem locale={locale} />
            </Grid>
          </Grid>
        </Link>
      </Grid>
    </Grid>
  );
};

export default SideBarSettingsPreview;
