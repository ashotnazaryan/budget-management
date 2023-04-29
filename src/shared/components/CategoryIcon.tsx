import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Category, CategoryType } from 'shared/models';
import Icon from 'shared/components/Icon';
import Typography from '@mui/material/Typography';

interface CategoryIconProps {
  data: Category;
  selected?: string;
  disabled?: boolean;
  onClick?: (data: Category) => void;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ data, selected, disabled, onClick }) => {
  const { palette: { primary, secondary, info, action } } = useTheme();
  const { id, name, icon, type } = data;
  const categoryColor = type === CategoryType.income ? primary.main : secondary.main;

  const onCategoryClick = (): void => {
    if (onClick) {
      onClick(data);
    }
  };

  const getColor = (): string => {
    return selected === id ? primary.contrastText : categoryColor;
  };

  const getBorder = (): string => {
    return disabled ? 'none' : `1px solid ${categoryColor}`;
  };

  const getBackgroundColor = (): string => {
    if (disabled) {
      return action.disabled;
    }

    return selected === id ? categoryColor : 'transparent';
  };

  return (
    <Box display='flex' flexDirection='column' alignItems='center' width={100}>
      <Box onClick={onCategoryClick} sx={{
        backgroundColor: getBackgroundColor(),
        border: getBorder(),
        color: getColor(),
        height: 64,
        width: 64,
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer'
      }}>
        <Icon name={icon}></Icon>
      </Box>
      <Typography color={info.contrastText} sx={{ width: '100%', textAlign: 'center', marginTop: 1, fontSize: 13 }}>{name}</Typography>
    </Box>
  );
};

export default CategoryIcon;
