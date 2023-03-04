import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { useAppDispatch } from 'store';
import { openSideBar } from 'store/reducers';

interface HeaderProps {
  fullName: string;
  avatar?: string;
}

const Header: React.FC<HeaderProps> = ({ fullName, avatar }) => {
  const dispatch = useAppDispatch();

  const showSideBar = (): void => {
    dispatch(openSideBar());
  };

  return (
    <AppBar position='static'>
      <Toolbar variant='dense'>
        <Grid container columnSpacing={2}>
          <Grid item xs={2}>
            <IconButton edge='start' color='inherit' sx={{ marginRight: 2 }} onClick={showSideBar}>
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs={10} display='flex' alignItems='center' justifyContent='flex-end'>
            <Avatar alt={fullName} src={avatar} sx={{ marginRight: 1 }} />
            {fullName}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
