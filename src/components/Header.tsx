import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';

const Header: React.FC = () => {
  return (
    <AppBar position='static'>
      <Toolbar variant='dense'>
        <IconButton edge='start' color='inherit' sx={{ marginRight: 2 }}>
          <MenuIcon />
        </IconButton>
        <Link to='/' style={{ marginRight: 8 }}>
          Home
        </Link>
        <Link to='/about'>
          About
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
