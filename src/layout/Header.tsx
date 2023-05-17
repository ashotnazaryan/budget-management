import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'core/i18n';
import { useAppDispatch, useAppSelector } from 'store';
import { openSideBar, selectSettings } from 'store/reducers';
import { ROUTES } from 'shared/constants';
import { mapCurrencyIsoToCountryCode, mapLocaleIsoToCountryCode } from 'shared/helpers';
import CountryFlag from 'shared/components/CountryFlag';
import Ellipsis from 'shared/components/Ellipsis';

interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { defaultCurrency, locale } = useAppSelector(selectSettings);
  const { palette: { primary: { contrastText, main } } } = useTheme();

  const showSideBar = (): void => {
    dispatch(openSideBar());
  };

  return (
    <AppBar position='static' sx={{ backgroundColor: main }}>
      <Toolbar variant='dense' sx={{ paddingX: 3 }}>
        <Grid container alignItems='center' flexWrap='nowrap' flexGrow={1}>
          <Grid item display='flex' justifyContent='flex-start'>
            <IconButton data-testid='menu-icon' edge='start' onClick={showSideBar}>
              <MenuIcon sx={{ color: contrastText }} />
            </IconButton>
          </Grid>
          <Grid item display='flex' justifyContent='center' flexGrow={1}>
            <Link to={ROUTES.dashboard.path}>
              <Ellipsis
                data-testid='product-name'
                text={t('PRODUCT_NAME')}
                color={contrastText}
                fontSize={{ sm: 19, xs: 16 }}
                sx={{ cursor: 'pointer', marginX: 1 }}
              />
            </Link>
          </Grid>
          <Grid item container display='flex' alignItems='center' justifyContent='flex-end' flexWrap='nowrap' columnGap={1}>
            <Grid item>
              <Link to={ROUTES.settings.path} style={{ display: 'block' }}>
                <CountryFlag code={mapCurrencyIsoToCountryCode(defaultCurrency.iso)} />
              </Link>
            </Grid>
            <Grid item>
              <Link to={ROUTES.settings.path} style={{ display: 'block' }}>
                <CountryFlag code={mapLocaleIsoToCountryCode(locale.iso)} />
              </Link>
            </Grid>
            <Grid item>
              <Link to={ROUTES.transactions.path} style={{ display: 'block' }}>
                <IconButton edge='end'>
                  <ListAltIcon sx={{ color: contrastText }} />
                </IconButton>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
