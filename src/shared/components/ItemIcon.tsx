import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { IconType } from 'shared/models';
import Icon from 'shared/components/Icon';

interface ItemIconProps {
  id: string;
  icon: IconType;
  selected?: string;
  size?: number;
  disabled?: boolean;
  onClick: ({ id }: { id: string }) => void;
}

const ItemIcon: React.FC<ItemIconProps> = ({ id, selected, icon, size = 64, disabled, onClick }) => {
  const { palette: { primary: { main, contrastText }, action } } = useTheme();

  const onItemClick = (id: string) => (): void => {
    onClick({ id });
  };

  const getColor = (): string => {
    return selected === id ? contrastText : main;
  };

  const getBorder = (): string => {
    return disabled ? 'none' : `1px solid ${main}`;
  };

  const getBackgroundColor = (): string => {
    if (disabled) {
      return action.disabled;
    }

    return selected === id ? main : 'transparent';
  };

  return (
    <Box display='flex' flexDirection='column' alignItems='center' width={size + 20}>
      <Box
        onClick={onItemClick(id)}
        sx={{
          backgroundColor: getBackgroundColor(),
          border: getBorder(),
          color: getColor(),
          height: size,
          width: size,
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: disabled ? 'default' : 'pointer'
        }}>
        <Icon name={icon}></Icon>
      </Box>
    </Box>
  );
};

export default ItemIcon;
