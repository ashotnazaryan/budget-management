import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from 'shared/constants';
import CategoryList from './pages/CategoryList';
import NewCategory from './pages/NewCategory';

interface CategoriesProps { }

const Categories: React.FC<CategoriesProps> = () => {
  return (
    <Routes>
      <Route path='/' element={<CategoryList />} />
      <Route path='/new' element={<NewCategory />} />
      <Route path='*' element={<Navigate to={ROUTES.categories.path} replace />} />
    </Routes>
  );
};

export default Categories;
