import * as React from 'react';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from 'store';
import { closeSidebar, selectSettings } from 'store/reducers';
import { ROUTES } from 'shared/constants';
import CurrencyInfoItem from 'shared/components/CurrencyInfoItem';
import LocaleInfoItem from 'shared/components/LocaleInfoItem';

interface SideBarSettingsPreviewProps { }

const SideBarSettingsPreview: React.FC<SideBarSettingsPreviewProps> = () => {
  const dispatch = useAppDispatch();
  const { defaultCurrency, locale } = useAppSelector(selectSettings);

  const handleNavigation = (): void => {
    dispatch(closeSidebar());
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingY: 2,
        paddingX: 4,
        borderBottom: (theme) => `1px solid ${theme.palette.secondary.main}`
      }}>
      <Link onClick={handleNavigation} to={ROUTES.settings.path}>
        <CurrencyInfoItem currency={defaultCurrency} sx={{ fontSize: 13 }} />
      </Link>
      <Divider orientation='vertical' variant='fullWidth' flexItem sx={{ marginX: 2 }} />
      <Link onClick={handleNavigation} to={ROUTES.settings.path}>
        <LocaleInfoItem locale={locale} sx={{ fontSize: 13 }} />
      </Link>
    </Box>
  );
};

export default SideBarSettingsPreview;
