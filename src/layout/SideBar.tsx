import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from 'store';
import { AUTH_KEY, ROUTES } from 'shared/constants';
import { closeSidebar, removeAuth, removeUser, selectSideBarOpened } from 'store/reducers';
import { removeFromLocalStorage } from 'shared/helpers';
import Box from '@mui/material/Box';

interface SideBarProps {
  variant?: DrawerProps['variant'];
}

const SideBar: React.FC<SideBarProps> = ({ variant, ...props }: SideBarProps) => {
  const opened = useAppSelector(selectSideBarOpened);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const close = (): void => {
    dispatch(closeSidebar());
  };

  const logout = (): void => {
    googleLogout();
    dispatch(removeUser());
    dispatch(removeAuth());
    dispatch(closeSidebar());
    removeFromLocalStorage(AUTH_KEY);
    navigate(ROUTES.login.path);
  };

  return (
    <Grid container justifyContent='flex-start' alignItems='center'>
      <Grid item>
        <Drawer
          variant={variant}
          {...props}
          PaperProps={{ sx: { width: '200px' } }}
          open={opened}
          onClose={close}
        >
          <List sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <ListItem onClick={close}>
                <ListItemText>
                  <Link to={ROUTES.dashboard.path}>
                    {ROUTES.dashboard.name}
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem onClick={close}>
                <ListItemText>
                  <Link to={ROUTES.about.path}>
                    {ROUTES.about.name}
                  </Link>
                </ListItemText>
              </ListItem>
            </Box>
            <ListItem onClick={logout}>
              <ListItemText>
                <Button fullWidth color='secondary' variant='contained' endIcon={<LogoutIcon />} onClick={logout}>
                  Logout
                </Button>
              </ListItemText>
            </ListItem>
          </List>
        </Drawer>
      </Grid>
    </Grid>
  );
};

export default SideBar;