import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from 'shared/constants';
import Dashboard from './pages/Dashboard';

interface MainProps { }

const Main: React.FC<MainProps> = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='*' element={<Navigate to={ROUTES.dashboard.path} replace />} />
    </Routes>
  );
};

export default Main;
