import * as React from 'react';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useAppDispatch, useAppSelector } from 'store';
import { Category as CategoryModel } from 'shared/models';
import { TABS } from 'shared/constants';
import { getCategories, selectCategories } from 'store/reducers';
import Tabs from 'shared/components/Tabs';
import Skeleton from 'shared/components/Skeleton';
import Category from './components/Category';
import PageTitle from 'shared/components/PageTitle';

interface CategoriesProps { }

const Categories: React.FC<CategoriesProps> = () => {
  const { categories, status } = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  const [categoryType, setCategoryType] = React.useState<number>(0);
  const tabs = TABS;

  React.useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleTabChange = (event: React.SyntheticEvent, value: number): void => {
    setCategoryType(value);
  };

  const handleCategoryItemClick = ({ categoryId, name }: { categoryId: CategoryModel['id'], name: CategoryModel['name'] }): void => {

  };

  const getContent = (): React.ReactElement => {
    if (status === 'loading' || status !== 'succeeded') {
      return <Skeleton />;
    }

    return (
      <Grid container columnGap={4} rowGap={4} sx={{ marginTop: 4 }}>
        {categories.filter(({ type }) => type === categoryType).map(({ name, type, icon, id }) => (
          <Grid item key={id}>
            <Category id={id} title={name} type={type} icon={icon} onClick={handleCategoryItemClick} />
          </Grid>
        ))}
      </Grid>
    );
  };

  const content = getContent();
  
  return (
    <Box>
      <PageTitle text='Categories' />
      <Tabs centered defaultValue={categoryType} tabs={tabs} onChange={handleTabChange} sx={{ marginBottom: 3 }} />
      {content}
    </Box>
  );
};

export default Categories;
