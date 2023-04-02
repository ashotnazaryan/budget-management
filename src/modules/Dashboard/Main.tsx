import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from 'shared/constants';
import Dashboard from './pages/Dashboard';
import NewTransaction from './pages/NewTransaction';

interface MainProps { }

const Main: React.FC<MainProps> = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/new' element={<NewTransaction />} />
      <Route path='*' element={<Navigate to={ROUTES.dashboard.path} replace />} />
    </Routes>
  );
};

export default Main;
