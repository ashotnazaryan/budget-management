import * as React from 'react';
import Box from '@mui/system/Box';
import { useAppDispatch, useAppSelector } from 'store';
import { getUserInfo, selectUser, selectUserStatus } from 'store/reducers';
import { getFromLocalStorage } from 'shared/helpers';
import { Auth } from 'shared/models';
import { AUTH_KEY } from 'shared/constants';
import Header from './Header';

interface ContentProps {
  children: React.ReactElement | null;
}

const Content: React.FC<ContentProps> = ({ children }: ContentProps) => {
  const auth = getFromLocalStorage<Auth>(AUTH_KEY);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const userStatus = useAppSelector(selectUserStatus);
  const fullName = `${user.firstName} ${user.lastName}`;

  React.useEffect(() => {
    if (userStatus === 'idle' && auth.token) {
      dispatch(getUserInfo(auth.token));
    }
  });

  return (
    <>
      <Header fullName={fullName} avatar={user.avatar} />
      <Box flexGrow={1} sx={{ paddingY: 2, paddingX: 4 }}>
        {children}
      </Box>
    </>
  );
};

export default Content;
