import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
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
import { theme } from 'core/theme.config';
import { useAppDispatch, useAppSelector } from 'store';
import { AUTH_KEY, ROUTES } from 'shared/constants';
import { closeSidebar, removeUser, selectDefaultCurrency, selectSideBarOpened, selectSummary, selectUser } from 'store/reducers';
import { removeFromLocalStorage } from 'shared/helpers';
import Dialog from 'components/Dialog';
import UserBalanceInfo from 'components/UserBalanceInfo';

interface SideBarProps extends MuiDrawerProps {

}

const SideBar: React.FC<SideBarProps> = ({ ...props }: SideBarProps) => {
  const opened = useAppSelector(selectSideBarOpened);
  const user = useAppSelector(selectUser);
  const { balance } = useAppSelector(selectSummary);
  const { symbol } = useAppSelector(selectDefaultCurrency);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false);
  const fullName = `${user.firstName} ${user.lastName}`;

  const close = (): void => {
    dispatch(closeSidebar());
  };

  const logout = (): void => {
    googleLogout();
    dispatch(removeUser());
    dispatch(closeSidebar());
    removeFromLocalStorage(AUTH_KEY);
    navigate(ROUTES.login.path);
  };

  const handleOpenDialog = (): void => {
    setDialogOpened(true);
  };

  const handleCloseDialog = (): void => {
    setDialogOpened(false);
  };

  const handleLogout = (): void => {
    setDialogOpened(false);
    logout();
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
                <UserBalanceInfo fullName={fullName} avatar={user.avatar} currency={symbol} balance={balance} />
              </Grid>
              <Grid item xs={1}>
                <IconButton edge='start' color='primary' onClick={close}>
                  <ArrowBackIcon />
                </IconButton>
              </Grid>
            </Grid>
            <List sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <ListItem onClick={close}>
                  <ListItemText>
                    <Link to={ROUTES.dashboard.path} style={{ display: 'block' }}>
                      {ROUTES.dashboard.name}
                    </Link>
                  </ListItemText>
                </ListItem>
                <ListItem onClick={close}>
                  <ListItemText>
                    <Link to={ROUTES.settings.path} style={{ display: 'block' }}>
                      {ROUTES.settings.name}
                    </Link>
                  </ListItemText>
                </ListItem>
                <ListItem onClick={close}>
                  <ListItemText>
                    <Link to={ROUTES.about.path} style={{ display: 'block' }}>
                      {ROUTES.about.name}
                    </Link>
                  </ListItemText>
                </ListItem>
              </Box>
              <ListItem onClick={handleOpenDialog}>
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
      <Dialog title='Logout' actionButtonText='Yes' open={dialogOpened} onClose={handleCloseDialog} onAction={handleLogout} sx={{}}>
        <Typography variant='subtitle1'>
          Are you sure you want to logout?
        </Typography>
      </Dialog>
    </>
  );
};

export default SideBar;