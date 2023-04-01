import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { theme } from 'core/theme.config';
import { useAppDispatch, useAppSelector } from 'store';
import { CategoryType, IconType } from 'shared/models';
import { ROUTES, TABS } from 'shared/constants';
import { getCategories, selectCategory } from 'store/reducers';
import Tabs from 'shared/components/Tabs';
import Skeleton from 'shared/components/Skeleton';
import PageTitle from 'shared/components/PageTitle';
import Icon from 'shared/components/Icon';
import Category from '../components/CategoryIcon';

interface CategoryListProps { }

const CategoryList: React.FC<CategoryListProps> = () => {
  const { categories, status } = useAppSelector(selectCategory);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [categoryType, setCategoryType] = React.useState<number>(0);
  const tabs = TABS;

  React.useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleTabChange = (event: React.SyntheticEvent, value: number): void => {
    setCategoryType(value);
  };

  const openNewCategoryPage = (): void => {
    navigate(`${ROUTES.categories.path}/new`);
  };

  const getIconColor = (): string => {
    return categoryType === CategoryType.expense ? theme.palette.secondary.main : theme.palette.primary.main;
  };

  const getContent = (): React.ReactElement => {
    if (status === 'loading' || status !== 'succeeded') {
      return <Skeleton />;
    }

    return (
      <Grid container columnGap={4} rowGap={4} sx={{ marginTop: 4 }}>
        {categories.filter(({ type }) => type === categoryType).map(({ name, type, icon, id }) => (
          <Grid item key={id}>
            <Category id={id} title={name} type={type} icon={icon} />
          </Grid>
        ))}
        <Grid item>
          <IconButton color='primary' onClick={openNewCategoryPage} sx={{ alignSelf: 'flex-end' }}>
            <Icon name={IconType.plus} sx={{ fontSize: 40, color: getIconColor() }}></Icon>
          </IconButton>
        </Grid>
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

export default CategoryList;
