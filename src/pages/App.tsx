import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Box from '@mui/system/Box';
import { ProtectedLayout } from 'layout/ProtectedLayout';
import { ROUTES } from 'shared/constants';
import Login from './Login';
import About from './About';
import Dashboard from './Dashboard';

const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Routes>
        <Route path={ROUTES.login.path} element={<Login />} />
        <Route path={ROUTES.home.path} element={<ProtectedLayout />}>
          <Route path={ROUTES.dashboard.path} element={<Dashboard />} />
          <Route path={ROUTES.about.path} element={<About />} />
        </Route>
      </Routes>
    </Box>
  );
};

export default App;
