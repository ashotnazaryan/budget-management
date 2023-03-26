import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/system/Box';
import { ProtectedLayout } from 'layout/ProtectedLayout';
import { ROUTES } from 'shared/constants';
import Login from './Login';
import Dashboard from './Dashboard';
import Settings from './Settings';
import Transactions from './Transactions';
import Categories from './Categories';

const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Routes>
        <Route path={ROUTES.login.path} element={<Login />} />
        <Route path={ROUTES.home.path} element={<ProtectedLayout />}>
          <Route path={ROUTES.home.path} element={<Navigate to={ROUTES.dashboard.path} replace />} />
          <Route path={ROUTES.dashboard.path} element={<Dashboard />} />
          <Route path={ROUTES.settings.path} element={<Settings />} />
          <Route path={ROUTES.transactions.path} element={<Transactions />} />
          <Route path={ROUTES.categories.path} element={<Categories />} />
          <Route path="*" element={<Navigate to={ROUTES.dashboard.path} replace />} />
        </Route>
      </Routes>
    </Box>
  );
};

export default App;
