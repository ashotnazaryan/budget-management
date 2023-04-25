import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from 'shared/constants';
import CreateEditTransfer from './pages/CreateEditTransfer';
import TransferList from './pages/TransferList';

interface TransfersProps { }

const Transfers: React.FC<TransfersProps> = () => {
  return (
    <Routes>
      <Route path='/' element={<TransferList />} />
      <Route path='/new' element={<CreateEditTransfer mode='create' />} />
      <Route path='/edit/:id' element={<CreateEditTransfer mode='edit' />} />
      <Route path='*' element={<Navigate to={ROUTES.transfers.path} replace />} />
    </Routes>
  );
};

export default Transfers;
