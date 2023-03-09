import * as React from 'react';
import Box from '@mui/system/Box';
import { theme } from 'core/theme.config';
import { useAppDispatch } from 'store';
import { getUserInfo } from 'store/reducers';
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

  React.useEffect(() => {
    dispatch(getUserInfo(auth.token));
  }, [dispatch, auth.token]);

  return (
    <>
      <Header />
      <Box flexGrow={1} sx={{ paddingY: 2, paddingX: 4, backgroundColor: theme.palette.info.light }}>
        {children}
      </Box>
    </>
  );
};

export default Content;
