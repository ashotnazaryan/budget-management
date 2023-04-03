import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from 'shared/constants';
import CategoryList from './pages/CategoryList';
import CreateEditCategory from './pages/CreateEditCategory';

interface CategoriesProps { }

const Categories: React.FC<CategoriesProps> = () => {
  return (
    <Routes>
      <Route path='/' element={<CategoryList />} />
      <Route path='/new' element={<CreateEditCategory mode='create' />} />
      <Route path='/edit/:id' element={<CreateEditCategory mode='edit' />} />
      <Route path='*' element={<Navigate to={ROUTES.categories.path} replace />} />
    </Routes>
  );
};

export default Categories;
