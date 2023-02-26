import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

const Header: React.FC = () => {
  return (
    <>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <IconButton edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h5'>
            Header
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
