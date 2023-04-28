import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from 'shared/constants';
import { ManageMode } from 'shared/models';
import AccountList from './pages/AccountList';
import CreateEditAccount from './pages/CreateEditAccount';

const Accounts: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<AccountList />} />
      <Route path='/new' element={<CreateEditAccount mode={ManageMode.create} />} />
      <Route path='/view/:id' element={<CreateEditAccount mode={ManageMode.view} />} />
      <Route path='/edit/:id' element={<CreateEditAccount mode={ManageMode.edit} />} />
      <Route path='*' element={<Navigate to={ROUTES.accounts.path} replace />} />
    </Routes>
  );
};

export default Accounts;
