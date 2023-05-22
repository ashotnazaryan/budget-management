import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'core/i18n';
import { useAppDispatch, useAppSelector } from 'store';
import { getCategories, selectCategory } from 'store/reducers';
import { Category, CategoryType, IconType, Option } from 'shared/models';
import { ROUTES, TABS } from 'shared/constants';
import Tabs from 'shared/components/Tabs';
import Skeleton from 'shared/components/Skeleton';
import PageTitle from 'shared/components/PageTitle';
import CategoryIcon from 'shared/components/CategoryIcon';
import EmptyState from 'shared/components/EmptyState';

const CategoryList: React.FC<{}> = () => {
  const tabs = TABS;
  const dispatch = useAppDispatch();
  const { categories, status } = useAppSelector(selectCategory);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [categoryType, setCategoryType] = React.useState<Option['value']>(String(CategoryType.expense));

  const addIconData: Category = {
    id: '',
    name: 'New category',
    nameKey: 'CATEGORIES.NEW_CATEGORY',
    icon: IconType.plus,
    type: Number(categoryType)
  };

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(getCategories());
    }
  }, [dispatch, status]);

  const handleTabChange = (event: React.SyntheticEvent, value: Option['value']): void => {
    setCategoryType(value);
  };

  const handleCategoryIconClick = ({ id, name }: Category): void => {
    navigate(`${ROUTES.categories.path}/view/${name}`, { state: { id } });
  };

  const openNewCategoryPage = (): void => {
    navigate(`${ROUTES.categories.path}/new`, { state: { categoryType } });
  };

  const getCategoryData = (data: Category): Category => {
    return {
      ...data,
      name: data.nameKey ? t(data.nameKey) : data.name
    };
  };

  const renderContent = (): React.ReactElement => {
    if (status === 'loading') {
      return (
        <Grid item xs={12}>
          <Skeleton type='circular' />
        </Grid>
      );
    }

    if ((status === 'failed' || status === 'succeeded') && !categories?.length) {
      return (
        <Grid item xs={12}>
          <EmptyState text={t('CATEGORIES.EMPTY_TEXT')} />
        </Grid>
      );
    }

    return (
      <>
        {categories
          .filter(({ type }) => String(type) === categoryType)
          .map((category) => (
            <Grid item key={category.id}>
              <CategoryIcon data={getCategoryData(category)} onItemClick={handleCategoryIconClick} />
            </Grid>
          ))}
      </>
    );
  };

  return (
    <Box flexGrow={1}>
      <PageTitle text={t('CATEGORIES.PAGE_TITLE')} />
      <Tabs centered defaultValue={categoryType} tabs={tabs} onChange={handleTabChange} sx={{ marginBottom: 3 }} />
      <Grid container columnGap={4} rowGap={4} sx={{ marginTop: 4 }}>
        {renderContent()}
        <Grid item>
          <CategoryIcon data={getCategoryData(addIconData)} onItemClick={openNewCategoryPage} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryList;
