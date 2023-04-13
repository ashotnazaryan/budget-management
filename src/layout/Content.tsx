import * as React from 'react';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'store';
import {
  getUserInfo,
  getSettings,
  selectApp,
} from 'store/reducers';
import Header from './Header';
import SideBar from './SideBar';
import Loading from './Loading';

interface ContentProps {
  children: React.ReactElement | null;
}

const Content: React.FC<ContentProps> = ({ children }: ContentProps) => {
  const dispatch = useAppDispatch();
  const { palette: { info: { light } } } = useTheme();
  const { status } = useAppSelector(selectApp);

  React.useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getSettings());
  }, [dispatch]);

  const getContent = (): React.ReactElement => {
    if (status === 'idle' || status === 'loading') {
      return <Loading />;
    }

    return (
      <Box display='flex' flexDirection='column' flexGrow={1} sx={{ overflowX: 'hidden', backgroundColor: light }}>
        <Header />
        <SideBar variant='temporary' />
        <Grid container display='flex' justifyContent='center' flexGrow={1}>
          <Grid item display='flex' md={8} xs={12}>
            <Box display='flex' flexGrow={1} sx={{
              paddingY: 2,
              paddingX: 3
            }}>
              {children}
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const content = getContent();

  return (
    <>{content}</>
  );
};

export default Content;
