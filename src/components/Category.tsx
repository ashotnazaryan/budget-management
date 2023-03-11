import * as React from 'react';
import Box from '@mui/material/Box';
import { theme } from 'core/theme.config';
import { Category as CategoryModel, CategoryType } from 'shared/models';

interface CategoryProps {
  id: CategoryModel['id'];
  title: CategoryModel['name'];
  type: CategoryType;
  selected?: CategoryModel['id'];
  onClick: ({ categoryId, name }: { categoryId: CategoryModel['id'], name: CategoryModel['name'] }) => void;
}

const Category: React.FC<CategoryProps> = ({ id, selected, title, type, onClick }) => {
  const { palette: { primary, secondary } } = theme;
  const categoryColor = type === CategoryType.income ? primary.main : secondary.main;

  const handleOnClick = (categoryId: CategoryModel['id']) => (): void => {
    onClick({ categoryId, name: title });
  };

  const getColor = (): string => {
    return selected === id ? primary.contrastText : (type === CategoryType.income ? primary.main : secondary.main);
  };

  return (
    <Box onClick={handleOnClick(id)} sx={{
      backgroundColor: selected === id ? categoryColor : 'transparent',
      border: `1px solid ${categoryColor}`,
      padding: 1,
      color: getColor(),
      height: 120,
      width: 120,
      borderRadius: '50%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }}>
      {title}
    </Box>
  );
};

export default Category;
