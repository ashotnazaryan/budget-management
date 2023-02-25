import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { Component } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import StyledHeader from './Header.styles';

class Header extends Component {
  render() {
    return (
      <StyledHeader>
        <AppBar position='static'>
          <Toolbar variant='dense'>
            <IconButton edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' component='div'>
              Header
            </Typography>
          </Toolbar>
        </AppBar>
      </StyledHeader>
    );
  }
}

export default Header; 