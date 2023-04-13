import * as React from 'react';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'store';
import { getFromLocalStorage } from 'shared/helpers';
import { Auth } from 'shared/models';
import { AUTH_KEY } from 'shared/constants';
import { getUserInfo, getSettings, selectApp, selectSettings, getBalance, getSummary, getAccounts, getTransactions, getCategories } from 'store/reducers';
import Header from './Header';
import SideBar from './SideBar';
import Loading from './Loading';

interface ContentProps {
  children: React.ReactElement | null;
}

const Content: React.FC<ContentProps> = ({ children }: ContentProps) => {
  const { accessToken } = getFromLocalStorage<Auth>(AUTH_KEY);
  const dispatch = useAppDispatch();
  const { palette: { info: { light } } } = useTheme();
  const { status } = useAppSelector(selectApp);
  const { showDecimals } = useAppSelector(selectSettings);

  React.useEffect(() => {
    dispatch(getUserInfo(accessToken));
  }, [dispatch, accessToken]);

  React.useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getBalance());
    dispatch(getSummary());
    dispatch(getAccounts());
    dispatch(getTransactions());
    dispatch(getCategories());
  }, [dispatch, showDecimals]);

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
