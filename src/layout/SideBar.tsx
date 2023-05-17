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
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'core/i18n';
import { useAppDispatch, useAppSelector } from 'store';
import {
  closeSidebar,
  selectUser,
  logout,
  selectApp,
  selectSummary,
  getBalance
} from 'store/reducers';
import { ROUTES } from 'shared/constants';
import Dialog from 'shared/components/Dialog';
import UserBalanceInfo from 'modules/components/UserBalanceInfo';

interface SideBarProps extends MuiDrawerProps { }

const SideBar: React.FC<SideBarProps> = ({ ...props }: SideBarProps) => {
  const dispatch = useAppDispatch();
  const { sideBarOpened } = useAppSelector(selectApp);
  const user = useAppSelector(selectUser);
  const { balance } = useAppSelector(selectSummary);
  const { palette: { secondary: { main } } } = useTheme();
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const avatar = user.avatar;

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

  React.useEffect(() => {
    dispatch(getBalance());
  }, [dispatch]);

  return (
    <>
      <Grid container justifyContent='flex-start' alignItems='center'>
        <Grid item>
          <Drawer
            {...props}
            variant={props.variant}
            PaperProps={{ sx: { width: { xs: '100%', sm: '280px' } } }}
            open={sideBarOpened}
            onClose={close}
          >
            <Grid item container alignItems='center' sx={{ paddingY: 2, paddingX: 4, borderBottom: `1px solid ${main}` }} columnSpacing={2}>
              <Grid item xs={11}>
                <UserBalanceInfo fullName={user.fullName} avatar={avatar} balance={balance} />
              </Grid>
              <Grid item xs={1}>
                <IconButton edge='start' color='secondary' onClick={close}>
                  <ArrowBackIcon />
                </IconButton>
              </Grid>
            </Grid>
            <List sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: 3 }}>
              <Box sx={{ flexGrow: 1 }}>
                <ListItem onClick={close} sx={{ padding: 0 }}>
                  <ListItemText>
                    <Link to={ROUTES.dashboard.path}>
                      <Button color='secondary' fullWidth startIcon={<DashboardIcon />} sx={{ justifyContent: 'flex-start' }}>
                        {t(ROUTES.dashboard.name)}
                      </Button>
                    </Link>
                  </ListItemText>
                </ListItem>
                <ListItem onClick={close} sx={{ padding: 0 }}>
                  <ListItemText>
                    <Link to={ROUTES.accounts.path}>
                      <Button color='secondary' fullWidth startIcon={<AccountBalanceWalletIcon />} sx={{ justifyContent: 'flex-start' }}>
                        {t(ROUTES.accounts.name)}
                      </Button>
                    </Link>
                  </ListItemText>
                </ListItem>
                <ListItem onClick={close} sx={{ padding: 0 }}>
                  <ListItemText>
                    <Link to={ROUTES.categories.path}>
                      <Button color='secondary' fullWidth startIcon={<CategoryIcon />} sx={{ justifyContent: 'flex-start' }}>
                        {t(ROUTES.categories.name)}
                      </Button>
                    </Link>
                  </ListItemText>
                </ListItem>
                <ListItem onClick={close} sx={{ padding: 0 }}>
                  <ListItemText>
                    <Link to={ROUTES.settings.path}>
                      <Button color='secondary' fullWidth startIcon={<SettingsIcon />} sx={{ justifyContent: 'flex-start' }}>
                        {t(ROUTES.settings.name)}
                      </Button>
                    </Link>
                  </ListItemText>
                </ListItem>
              </Box>
              <ListItem onClick={handleOpenDialog} sx={{ padding: 0 }}>
                <ListItemText>
                  <Button fullWidth color='secondary' variant='contained' endIcon={<LogoutIcon />}>
                    {t('SIDEBAR.LOGOUT')}
                  </Button>
                </ListItemText>
              </ListItem>
            </List>
          </Drawer>
        </Grid>
      </Grid>
      <Dialog
        fullWidth
        maxWidth='xs'
        title={t('SIDEBAR.LOGOUT_DIALOG_TITLE')!}
        actionButtonText={t('COMMON.YES')!}
        open={dialogOpened}
        onClose={handleCloseDialog}
        onAction={handleLogout}>
        <Typography variant='subtitle1'>
          {t('SIDEBAR.LOGOUT_DIALOG_CONFIRM')}
        </Typography>
      </Dialog>
    </>
  );
};

export default SideBar;