import * as React from 'react';
import Box from '@mui/system/Box';
import { useAppDispatch, useAppSelector } from 'store';
import { getUserInfo, selectUser, selectUserStatus } from 'store/reducers/userSlice';
import { selectAuthStatus, setAuth } from 'store/reducers/authSlice';
import { getFromLocalStorage } from 'shared/helpers';
import { AuthState } from 'shared/models';
import { AUTH_KEY } from 'shared/constants';
import Header from './Header';

interface ContentProps {
  children: React.ReactElement | null;
}

const Content: React.FC<ContentProps> = ({ children }: ContentProps) => {
  const auth = getFromLocalStorage<AuthState>(AUTH_KEY);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const userStatus = useAppSelector(selectUserStatus);
  const authStatus = useAppSelector(selectAuthStatus);
  const fullName = `${user.firstName} ${user.lastName}`;

  React.useEffect(() => {
    if (authStatus === 'idle') {
      dispatch(setAuth(auth));
    }
  });

  React.useEffect(() => {
    if (userStatus === 'idle') {
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
