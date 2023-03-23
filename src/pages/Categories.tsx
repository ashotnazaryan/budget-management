import * as React from 'react';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useAppDispatch, useAppSelector } from 'store';
import { CategoryType, Category as CategoryModel } from 'shared/models';
import { getCategories, selectCategories } from 'store/reducers';
import Tabs, { Tab } from 'shared/components/Tabs';
import Category from './components/Category';

interface CategoriesProps { }

const Categories: React.FC<CategoriesProps> = () => {
  const { categories } = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  const [categoryType, setCategoryType] = React.useState<number>(0);

  React.useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleTabChange = (event: React.SyntheticEvent, value: number) => {
    setCategoryType(value);
  };

  const handleCategoryItemClick = ({ categoryId, name }: { categoryId: CategoryModel['id'], name: CategoryModel['name'] }): void => {

  };

  const tabs: Tab[] = [{ value: CategoryType.expense, label: 'Expense' }, { value: CategoryType.income, label: 'Income' }];
  return (
    <Box>
      <Tabs centered defaultValue={categoryType} tabs={tabs} onChange={handleTabChange} />
      <Grid container columnGap={8} rowGap={4}>
        {categories.filter(({ type }) => type === categoryType).map(({ name, type, icon, id }) => (
          // TODO: fix key
          <Grid item key={`${name}-${icon}`}>
            <Category id={id} title={name} type={type} icon={icon} onClick={handleCategoryItemClick} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;
