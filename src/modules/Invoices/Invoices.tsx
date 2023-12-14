import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from 'shared/constants';
import { ManageMode } from 'shared/models';
import InvoiceList from './pages/InvoiceList';
import CreateEditInvoice from './pages/CreateEditInvoice';

const Invoices: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<InvoiceList />} />
      <Route path='/new' element={<CreateEditInvoice mode={ManageMode.create} />} />
      <Route path='/view/:id' element={<CreateEditInvoice mode={ManageMode.view} />} />
      <Route path='/edit/:id' element={<CreateEditInvoice mode={ManageMode.edit} />} />
      <Route path='*' element={<Navigate to={ROUTES.invoices.path} replace />} />
    </Routes>
  );
};

export default Invoices;
