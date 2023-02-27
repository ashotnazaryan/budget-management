import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import LogoutIcon from '@mui/icons-material/Logout';
import { ROUTES } from 'shared/constants';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const logout = (): void => {
    googleLogout();
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
          <Grid item xs={1} display='flex' alignItems='center'>
            <Link to={ROUTES.home.path}>
              {ROUTES.home.name}
            </Link>
          </Grid>
          <Grid item xs={1} display='flex' alignItems='center'>
            <Link to={ROUTES.about.path}>
              {ROUTES.about.name}
            </Link>
          </Grid>
          <Grid item xs={9} display='flex' alignItems='center' justifyContent='flex-end'>
            <IconButton color='secondary' onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
