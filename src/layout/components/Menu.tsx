import * as React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import CategoryIcon from '@mui/icons-material/Category';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'core/i18n';
import { ROUTES } from 'shared/constants';
import Button from 'shared/components/Button';

interface MenuProps {
  onOpenDialog: () => void;
  onCloseSideBar: () => void;
}

const Menu: React.FC<MenuProps> = ({ onOpenDialog, onCloseSideBar }) => {
  const { t } = useTranslation();

  const openDialog = (): void => {
    onOpenDialog();
  };

  const close = (): void => {
    onCloseSideBar();
  };

  return (
    <List sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <ListItem onClick={close} sx={{ padding: 0 }}>
          <ListItemText>
            <Link to={ROUTES.dashboard.path}>
              <Button aria-label='Dashboard link' color='secondary' fullWidth startIcon={<DashboardIcon />} sx={{ justifyContent: 'flex-start' }}>
                {t(ROUTES.dashboard.name)}
              </Button>
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem onClick={close} sx={{ padding: 0 }}>
          <ListItemText>
            <Link to={ROUTES.accounts.path}>
              <Button aria-label='Accounts link' color='secondary' fullWidth startIcon={<AccountBalanceWalletIcon />} sx={{ justifyContent: 'flex-start' }}>
                {t(ROUTES.accounts.name)}
              </Button>
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem onClick={close} sx={{ padding: 0 }}>
          <ListItemText>
            <Link to={ROUTES.categories.path}>
              <Button aria-label='Categories link' color='secondary' fullWidth startIcon={<CategoryIcon />} sx={{ justifyContent: 'flex-start' }}>
                {t(ROUTES.categories.name)}
              </Button>
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem onClick={close} sx={{ padding: 0 }}>
          <ListItemText>
            <Link to={ROUTES.settings.path}>
              <Button aria-label='Settings link' color='secondary' fullWidth startIcon={<SettingsIcon />} sx={{ justifyContent: 'flex-start' }}>
                {t(ROUTES.settings.name)}
              </Button>
            </Link>
          </ListItemText>
        </ListItem>
      </Box>
      <ListItem onClick={openDialog} sx={{ padding: 0 }}>
        <ListItemText>
          <Button aria-label='Logout' fullWidth color='secondary' variant='contained' endIcon={<LogoutIcon />}>
            {t('SIDEBAR.LOGOUT')}
          </Button>
        </ListItemText>
      </ListItem>
    </List>
  );
};

export default Menu;