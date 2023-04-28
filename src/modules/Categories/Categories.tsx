import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from 'shared/constants';
import { ManageMode } from 'shared/models';
import CategoryList from './pages/CategoryList';
import CreateEditCategory from './pages/CreateEditCategory';

const Categories: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<CategoryList />} />
      <Route path='/new' element={<CreateEditCategory mode={ManageMode.create} />} />
      <Route path='/view/:id' element={<CreateEditCategory mode={ManageMode.view} />} />
      <Route path='/edit/:id' element={<CreateEditCategory mode={ManageMode.edit} />} />
      <Route path='*' element={<Navigate to={ROUTES.categories.path} replace />} />
    </Routes>
  );
};

export default Categories;
