import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Category, CategoryType } from 'shared/models';
import Icon from 'shared/components/Icon';

type CategoryIconProps = {
  data: Category;
  selected?: string;
  disabled?: boolean;
  readonly?: boolean;
  onItemClick?: (data: Category) => void;
} & BoxProps

const CategoryIcon: React.FC<CategoryIconProps> = ({ data, selected, disabled, readonly, onItemClick, ...props }) => {
  const { palette: { primary, secondary, info, action } } = useTheme();
  const { id, name, icon, type } = data;
  const categoryColor = type === CategoryType.income ? primary.main : secondary.main;

  const onCategoryClick = (): void => {
    if (readonly) {
      return;
    }

    if (onItemClick) {
      onItemClick(data);
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
      <Box {...props} onClick={onCategoryClick}
        sx={{
          ...props.sx,
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
          cursor: (disabled || readonly) ? 'default' : 'pointer'
        }}>
        <Icon name={icon}></Icon>
      </Box>
      <Typography color={info.contrastText} sx={{ width: '100%', textAlign: 'center', marginTop: 1, fontSize: 13 }}>{name}</Typography>
    </Box>
  );
};

export default CategoryIcon;
