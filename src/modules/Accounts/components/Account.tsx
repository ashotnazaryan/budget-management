import * as React from 'react';
import Box from '@mui/material/Box';
import { theme } from 'core/theme.config';
import { Account as AccountModel } from 'shared/models';
import Icon from 'shared/components/Icon';
import Ellipsis from 'shared/components/Ellipsis';

interface AccountProps {
  id: AccountModel['id'];
  icon: AccountModel['icon'];
  title?: AccountModel['name'];
  selected?: AccountModel['id'];
  showTitle?: boolean;
  size?: number;
  onClick: ({ id, name }: { id: AccountModel['id'], name: AccountModel['name'] }) => void;
}

const Account: React.FC<AccountProps> = ({ id, selected, title = '', showTitle = true, icon, size = 64, onClick }) => {
  const { palette: { primary: { main, contrastText } } } = theme;

  const onAccountClick = (id: AccountModel['id']) => (): void => {
    onClick({ id, name: title });
  };

  const getColor = (): string => {
    return selected === id ? contrastText : main;
  };

  return (
    <Box display='flex' flexDirection='column' alignItems='center' width={128}>
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
      {showTitle && <Ellipsis text={title} sx={{ width: '100%', textAlign: 'center', marginTop: 1 }} />}
    </Box>
  );
};

export default Account;
