import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/system/Box';
import { useAppSelector } from 'store';
import { selectSettings } from 'store/reducers';
import { lightTheme, darkTheme } from 'core/theme.config';
import { ProtectedLayout } from 'layout/ProtectedLayout';
import { ROUTES } from 'shared/constants';
import Login from './Login';
import Main from './Dashboard/Main';
import Settings from './Settings';
import Transactions from './Transactions/Transactions';
import Categories from './Categories/Categories';
import Accounts from './Accounts/Accounts';
import Transfers from './Transfers/Transfers';

const App: React.FC = () => {
  const { isDarkTheme } = useAppSelector(selectSettings);
  const appTheme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={appTheme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Routes>
          <Route path={ROUTES.login.path} element={<Login />} />
          <Route path={ROUTES.home.path} element={<ProtectedLayout />}>
            <Route path={ROUTES.home.path} element={<Navigate to={ROUTES.dashboard.path} replace />} />
            <Route path={`${ROUTES.dashboard.path}/*`} element={<Main />} />
            <Route path={ROUTES.settings.path} element={<Settings />} />
            <Route path={`${ROUTES.transactions.path}/*`} element={<Transactions />} />
            <Route path={`${ROUTES.categories.path}/*`} element={<Categories />} />
            <Route path={`${ROUTES.accounts.path}/*`} element={<Accounts />} />
            <Route path={`${ROUTES.transfers.path}/*`} element={<Transfers />} />
            <Route path="*" element={<Navigate to={ROUTES.dashboard.path} replace />} />
          </Route>
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;
