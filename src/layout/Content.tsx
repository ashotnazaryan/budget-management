import * as React from 'react';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch } from 'store';
import { getFromLocalStorage } from 'shared/helpers';
import { Auth } from 'shared/models';
import { AUTH_KEY } from 'shared/constants';
import { getUserInfo, getSettings } from 'store/reducers';
import Header from './Header';
import SideBar from './SideBar';

interface ContentProps {
  children: React.ReactElement | null;
}

const Content: React.FC<ContentProps> = ({ children }: ContentProps) => {
  const { accessToken } = getFromLocalStorage<Auth>(AUTH_KEY);
  const dispatch = useAppDispatch();
  const { palette: { info: { light } } } = useTheme();

  React.useEffect(() => {
    dispatch(getUserInfo(accessToken));
  }, [dispatch, accessToken]);

  React.useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  return (
    <Box display='flex' flexDirection='column' flexGrow={1} sx={{ overflowX: 'hidden', backgroundColor: light }}>
      <Header />
      <SideBar variant='temporary' />
      <Grid container display='flex' justifyContent='center' flexGrow={1}>
        <Grid item display='flex' md={8} xs={12}>
          <Box display='flex' flexGrow={1} sx={{
            paddingY: 2,
            paddingX: { xs: 2, sm: 4 }
          }}>
            {children}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Content;
