import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from 'shared/constants';
import AccountList from './pages/AccountList';
import CreateEditAccount from './pages/CreateEditAccount';

interface AccountsProps { }

const Accounts: React.FC<AccountsProps> = () => {
  return (
    <Routes>
      <Route path='/' element={<AccountList />} />
      <Route path='/new' element={<CreateEditAccount mode='create' />} />
      <Route path='/edit/:id' element={<CreateEditAccount mode='edit' />} />
      <Route path='*' element={<Navigate to={ROUTES.accounts.path} replace />} />
    </Routes>
  );
};

export default Accounts;
