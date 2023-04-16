import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'store';
import { getCategories, selectCategory } from 'store/reducers';
import { Category, CategoryType, IconType } from 'shared/models';
import { ROUTES, TABS } from 'shared/constants';
import Tabs from 'shared/components/Tabs';
import Skeleton from 'shared/components/Skeleton';
import PageTitle from 'shared/components/PageTitle';
import Icon from 'shared/components/Icon';
import CategoryIcon from 'shared/components/CategoryIcon';
import EmptyState from 'shared/components/EmptyState';

interface CategoryListProps { }

const CategoryList: React.FC<CategoryListProps> = () => {
  const tabs = TABS;
  const dispatch = useAppDispatch();
  const { categories, status } = useAppSelector(selectCategory);
  const navigate = useNavigate();
  const { palette } = useTheme();
  const { t } = useTranslation();
  const [categoryType, setCategoryType] = React.useState<number>(0);

  React.useEffect(() => {
    if (status === 'idle' || status === 'failed') {
      dispatch(getCategories());
    }
  }, [dispatch, status]);

  const handleTabChange = (event: React.SyntheticEvent, value: number): void => {
    setCategoryType(value);
  };

  const handleCategoryIconClick = ({ id, name }: Category): void => {
    navigate(`${ROUTES.categories.path}/edit/${name}`, { state: { id } });
  };

  const openNewCategoryPage = (): void => {
    navigate(`${ROUTES.categories.path}/new`, { state: { categoryType } });
  };

  const getIconColor = (): string => {
    return categoryType === CategoryType.expense ? palette.secondary.main : palette.primary.main;
  };

  const getCategoryData = (data: Category): Category => {
    return {
      ...data,
      name: data.nameKey ? t(data.nameKey) : data.name
    };
  };

  const getContent = (): React.ReactElement => {
    if (status === 'loading' || status !== 'succeeded') {
      return <Skeleton />;
    }

    if (!categories?.length) {
      return <EmptyState text={t('CATEGORIES.EMPTY_TEXT')!} />;
    }

    return (
      <Grid container columnGap={4} rowGap={4} sx={{ marginTop: 4 }}>
        {categories.filter(({ type }) => type === categoryType).map((category) => (
          <Grid item key={category.id}>
            <CategoryIcon data={getCategoryData(category)} onClick={handleCategoryIconClick} />
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
    <Box flexGrow={1}>
      <PageTitle text={t('CATEGORIES.PAGE_TITLE')} />
      <Tabs centered defaultValue={categoryType} tabs={tabs} onChange={handleTabChange} sx={{ marginBottom: 3 }} />
      {content}
    </Box>
  );
};

export default CategoryList;
