import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { IconType } from 'shared/models';
import Icon from 'shared/components/Icon';

interface AccountIconProps {
  id: string;
  icon: IconType;
  selected?: string;
  size?: number;
  onClick: ({ id }: { id: string }) => void;
}

// TODO: make this component generic
const AccountIcon: React.FC<AccountIconProps> = ({ id, selected, icon, size = 64, onClick }) => {
  const { palette: { primary: { main, contrastText } } } = useTheme();

  const onAccountClick = (id: string) => (): void => {
    onClick({ id });
  };

  const getColor = (): string => {
    return selected === id ? contrastText : main;
  };

  return (
    <Box display='flex' flexDirection='column' alignItems='center' width={size + 20}>
      <Box onClick={onAccountClick(id)} sx={{
        backgroundColor: selected === id ? main : 'transparent',
        border: `1px solid ${main}`,
        color: getColor(),
        height: size,
        width: size,
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}>
        <Icon name={icon}></Icon>
      </Box>
    </Box>
  );
};

export default AccountIcon;
