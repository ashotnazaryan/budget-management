import Box from '@mui/system/Box';
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from 'shared/constants';
import About from './About';
import Home from './Home';
import Login from './Login';

const Content: React.FC = () => {
  return (
    <Box sx={{ paddingY: 2, paddingX: 4, flexGrow: 1 }}>
      <Routes>
        <Route path={ROUTES.login.path} element={<Login />} />
        <Route path={ROUTES.home.path} element={<Home />} />
        <Route path={ROUTES.about.path} element={<About />} />
      </Routes>
    </Box>
  );
};

export default Content;
