import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from 'shared/constants';
import AccountList from './pages/AccountList';
import NewAccount from './pages/NewAccount';

interface AccountsProps { }

const Accounts: React.FC<AccountsProps> = () => {
  return (
    <Routes>
      <Route path='/' element={<AccountList />} />
      <Route path='/new' element={<NewAccount />} />
      <Route path="*" element={<Navigate to={ROUTES.accounts.path} replace />} />
    </Routes>
  );
};

export default Accounts;
