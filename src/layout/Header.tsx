import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch } from 'store';
import { openSideBar } from 'store/reducers';

interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
  const dispatch = useAppDispatch();

  const showSideBar = (): void => {
    dispatch(openSideBar());
  };

  return (
    <AppBar position='static'>
      <Toolbar variant='dense'>
        <IconButton edge='start' color='inherit' sx={{ marginRight: 2 }} onClick={showSideBar}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
