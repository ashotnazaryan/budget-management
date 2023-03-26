import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useAppDispatch } from 'store';
import { theme } from 'core/theme.config';
import { openSideBar } from 'store/reducers';
import { ROUTES } from 'shared/constants';

interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
  const dispatch = useAppDispatch();

  const showSideBar = (): void => {
    dispatch(openSideBar());
  };

  return (
    <AppBar position='static'>
      <Toolbar variant='dense'>
        <Grid container alignItems='center' justifyContent='space-between'>
          <Grid item>
            <IconButton edge='start' color='inherit' onClick={showSideBar}>
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Link to={ROUTES.transactions.path} style={{ display: 'block' }}>
              <IconButton edge='end' sx={{ color: theme.palette.primary.contrastText }}>
                <ListAltIcon />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
