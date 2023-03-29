import * as React from 'react';
import Box from '@mui/material/Box';
import { theme } from 'core/theme.config';
import { Category as CategoryModel, CategoryType } from 'shared/models';
import Icon from 'shared/components/Icon';
import Ellipsis from 'shared/components/Ellipsis';

interface CategoryProps {
  id: CategoryModel['id'];
  title: CategoryModel['name'];
  type: CategoryType;
  selected?: CategoryModel['id'];
  icon: CategoryModel['icon'];
  onClick: ({ categoryId, name }: { categoryId: CategoryModel['id'], name: CategoryModel['name'] }) => void;
}

const Category: React.FC<CategoryProps> = ({ id, selected, title, type, icon, onClick }) => {
  const { palette: { primary, secondary } } = theme;
  const categoryColor = type === CategoryType.income ? primary.main : secondary.main;

  const onCategoryClick = (id: CategoryModel['id']) => (): void => {
    onClick({ categoryId: id, name: title });
  };

  const getColor = (): string => {
    return selected === id ? primary.contrastText : (type === CategoryType.income ? primary.main : secondary.main);
  };

  return (
    <Box display='flex' flexDirection='column' alignItems='center' width={128}>
      <Box onClick={onCategoryClick(id)} sx={{
        backgroundColor: selected === id ? categoryColor : 'transparent',
        border: `1px solid ${categoryColor}`,
        color: getColor(),
        height: 64,
        width: 64,
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}>
        <Icon name={icon}></Icon>
      </Box>
      <Ellipsis text={title} sx={{ width: '100%', textAlign: 'center', marginTop: 1 }} />
    </Box>
  );
};

export default Category;
