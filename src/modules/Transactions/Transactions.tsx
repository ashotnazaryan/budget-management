import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from 'shared/constants';
import { ManageMode } from 'shared/models';
import TransactionList from './pages/TransactionList';
import CreateEditTransaction from './pages/CreateEditTransaction';

const Transactions: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<TransactionList />} />
      <Route path='/new' element={<CreateEditTransaction mode={ManageMode.create} />} />
      <Route path='/view/:id' element={<CreateEditTransaction mode={ManageMode.view} />} />
      <Route path='/edit/:id' element={<CreateEditTransaction mode={ManageMode.edit} />} />
      <Route path='*' element={<Navigate to={ROUTES.accounts.path} replace />} />
    </Routes>
  );
};

export default Transactions;
