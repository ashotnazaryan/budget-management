import * as React from 'react';
import Box from '@mui/system/Box';
import { theme } from 'core/theme.config';
import { useAppDispatch } from 'store';
import { getSettings, getUserInfo } from 'store/reducers';
import { getFromLocalStorage } from 'shared/helpers';
import { AuthState } from 'shared/models';
import { AUTH_KEY } from 'shared/constants';
import Header from './Header';
import SideBar from './SideBar';

interface ContentProps {
  children: React.ReactElement | null;
}

const Content: React.FC<ContentProps> = ({ children }: ContentProps) => {
  const { accessToken } = getFromLocalStorage<AuthState>(AUTH_KEY);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getUserInfo(accessToken));
  }, [dispatch, accessToken]);

  React.useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  return (
    <Box flexGrow={1} display='flex' flexDirection='column'>
      <Header />
      <SideBar variant='temporary' />
      <Box flexGrow={1} sx={{
        paddingY: 2,
        paddingX: { xs: 2, sm: 4 },
        backgroundColor: theme.palette.info.light
      }}>
        {children}
      </Box>
    </Box>
  );
};

export default Content;
