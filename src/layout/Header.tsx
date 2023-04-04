import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch } from 'store';
import { ROUTES } from 'shared/constants';
import { openSideBar } from 'store/reducers';

interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
  const dispatch = useAppDispatch();
  const { palette: { primary: { contrastText, dark } } } = useTheme();

  const showSideBar = (): void => {
    dispatch(openSideBar());
  };

  return (
    <AppBar position='static' sx={{ backgroundColor: dark }}>
      <Toolbar variant='dense' sx={{ paddingX: { sm: 4, xs: 2 } }}>
        <Grid container alignItems='center' justifyContent='space-between'>
          <Grid item>
            <IconButton edge='start' onClick={showSideBar}>
              <MenuIcon sx={{ color: contrastText }} />
            </IconButton>
          </Grid>
          <Grid item>
            <Link to={ROUTES.transactions.path} style={{ display: 'block' }}>
              <IconButton edge='end'>
                <ListAltIcon sx={{ color: contrastText }} />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
