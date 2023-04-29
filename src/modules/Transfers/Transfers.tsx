import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from 'shared/constants';
import { ManageMode } from 'shared/models';
import CreateEditTransfer from './pages/CreateEditTransfer';
import TransferList from './pages/TransferList';

const Transfers: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<TransferList />} />
      <Route path='/new' element={<CreateEditTransfer mode={ManageMode.create} />} />
      <Route path='/view/:id' element={<CreateEditTransfer mode={ManageMode.view} />} />
      <Route path='/edit/:id' element={<CreateEditTransfer mode={ManageMode.edit} />} />
      <Route path='*' element={<Navigate to={ROUTES.transfers.path} replace />} />
    </Routes>
  );
};

export default Transfers;
