import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import { useAppDispatch, useAppSelector } from 'store';
import { ROUTES, AUTH_KEY } from 'shared/constants';
import { removeFromLocalStorage } from 'shared/helpers';
import { removeUser } from 'store/reducers/userSlice';
import { removeAuth, selectAuth } from 'store/reducers/authSlice';

interface HeaderProps {
  fullName: string;
  avatar?: string;
}

const Header: React.FC<HeaderProps> = ({ fullName, avatar }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const logout = (): void => {
    googleLogout();
    dispatch(removeUser());
    dispatch(removeAuth());
    removeFromLocalStorage(AUTH_KEY);
    navigate(ROUTES.login.path);
  };

  return (
    <AppBar position='static'>
      <Toolbar variant='dense'>
        <Grid container columnSpacing={2}>
          <Grid item xs={1}>
            <IconButton edge='start' color='inherit' sx={{ marginRight: 2 }}>
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs={2} display='flex' alignItems='center'>
            <Link to={ROUTES.dashboard.path}>
              {ROUTES.dashboard.name}
            </Link>
          </Grid>
          <Grid item xs={2} display='flex' alignItems='center'>
            <Link to={ROUTES.about.path}>
              {ROUTES.about.name}
            </Link>
          </Grid>
          <Grid item xs={7} display='flex' alignItems='center' justifyContent='flex-end'>
            <Avatar alt={fullName} src={avatar} sx={{ marginRight: 1 }} />
            {fullName}
            {auth.isLoggedIn && (
              <IconButton color='secondary' onClick={logout}>
                <LogoutIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
