import * as React from 'react';
import Box from '@mui/system/Box';
import { useAppDispatch, useAppSelector } from 'store';
import { getUser, selectUser } from 'store/reducers/userSlice';
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

  React.useEffect(() => {
    dispatch(getUser(auth.token));
  }, [auth.token, dispatch]);

  const user = useAppSelector(selectUser);
  const fullName = `${user.firstName} ${user.lastName}`;

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
