import * as React from 'react';
import { Link } from 'react-router-dom';
import Drawer, { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import CategoryIcon from '@mui/icons-material/Category';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { theme } from 'core/theme.config';
import { useAppDispatch, useAppSelector } from 'store';
import { ROUTES } from 'shared/constants';
import { closeSidebar, getBalance, logout, selectBalance, selectSettings, selectSideBarOpened, selectUser } from 'store/reducers';
import Dialog from 'shared/components/Dialog';
import UserBalanceInfo from 'modules/components/UserBalanceInfo';

interface SideBarProps extends MuiDrawerProps { }

const SideBar: React.FC<SideBarProps> = ({ ...props }: SideBarProps) => {
  const dispatch = useAppDispatch();
  const opened = useAppSelector(selectSideBarOpened);
  const user = useAppSelector(selectUser);
  const balance = useAppSelector(selectBalance);
  const { currency: { symbol }, showDecimals } = useAppSelector(selectSettings);
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false);
  const fullName = `${user.firstName} ${user.lastName}`;
  const avatar = user.avatar;

  React.useEffect(() => {
    dispatch(getBalance());
  }, [dispatch, showDecimals]);

  const close = (): void => {
    dispatch(closeSidebar());
  };

  const handleOpenDialog = (): void => {
    setDialogOpened(true);
  };

  const handleCloseDialog = (): void => {
    setDialogOpened(false);
  };

  const handleLogout = (): void => {
    setDialogOpened(false);
    dispatch(logout());
  };

  return (
    <>
      <Grid container justifyContent='flex-start' alignItems='center'>
        <Grid item>
          <Drawer
            {...props}
            variant={props.variant}
            PaperProps={{ sx: { width: { xs: '100%', sm: '280px' } } }}
            open={opened}
            onClose={close}
          >
            <Grid item container alignItems='center' sx={{ paddingY: 2, paddingX: 4, borderBottom: `1px solid ${theme.palette.primary.main}` }} columnSpacing={2}>
              <Grid item xs={11}>
                <UserBalanceInfo fullName={fullName} avatar={avatar} currency={symbol} balance={balance} />
              </Grid>
              <Grid item xs={1}>
                <IconButton edge='start' color='primary' onClick={close}>
                  <ArrowBackIcon />
                </IconButton>
              </Grid>
            </Grid>
            <List sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: 3 }}>
              <Box sx={{ flexGrow: 1 }}>
                <ListItem onClick={close} sx={{ padding: 0 }}>
                  <ListItemText>
                    <Link to={ROUTES.dashboard.path}>
                      <Button fullWidth startIcon={<DashboardIcon />} sx={{ justifyContent: 'flex-start' }}>
                        {ROUTES.dashboard.name}
                      </Button>
                    </Link>
                  </ListItemText>
                </ListItem>
                <ListItem onClick={close} sx={{ padding: 0 }}>
                  <ListItemText>
                    <Link to={ROUTES.accounts.path}>
                      <Button fullWidth startIcon={<AccountBalanceWalletIcon />} sx={{ justifyContent: 'flex-start' }}>
                        {ROUTES.accounts.name}
                      </Button>
                    </Link>
                  </ListItemText>
                </ListItem>
                <ListItem onClick={close} sx={{ padding: 0 }}>
                  <ListItemText>
                    <Link to={ROUTES.categories.path}>
                      <Button fullWidth startIcon={<CategoryIcon />} sx={{ justifyContent: 'flex-start' }}>
                        {ROUTES.categories.name}
                      </Button>
                    </Link>
                  </ListItemText>
                </ListItem>
                <ListItem onClick={close} sx={{ padding: 0 }}>
                  <ListItemText>
                    <Link to={ROUTES.settings.path}>
                      <Button fullWidth startIcon={<SettingsIcon />} sx={{ justifyContent: 'flex-start' }}>
                        {ROUTES.settings.name}
                      </Button>
                    </Link>
                  </ListItemText>
                </ListItem>
              </Box>
              <ListItem onClick={handleOpenDialog} sx={{ padding: 0 }}>
                <ListItemText>
                  <Button fullWidth color='secondary' variant='contained' endIcon={<LogoutIcon />}>
                    Logout
                  </Button>
                </ListItemText>
              </ListItem>
            </List>
          </Drawer>
        </Grid>
      </Grid>
      <Dialog title='Logout' actionButtonText='Yes' open={dialogOpened} onClose={handleCloseDialog} onAction={handleLogout} fullWidth maxWidth='xs'>
        <Typography variant='subtitle1'>
          Are you sure you want to logout?
        </Typography>
      </Dialog>
    </>
  );
};

export default SideBar;