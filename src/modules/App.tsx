import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/system/Box';
import date from 'core/date';
import { useTranslation } from 'core/i18n';
import { lightTheme, darkTheme } from 'core/theme.config';
import { useAppSelector } from 'store';
import { selectSettings } from 'store/reducers';
import { ROUTES } from 'shared/constants';
import { ProtectedLayout } from 'layout/ProtectedLayout';
import Loading from 'layout/Loading';
import Settings from './Settings';
import Profile from './Profile';

const App: React.FC = () => {
  const { isDarkTheme, locale: { iso } } = useAppSelector(selectSettings);
  const appTheme = isDarkTheme ? darkTheme : lightTheme;
  const { i18n } = useTranslation();

  const createLazyComponent = (importFunc: any): React.ReactElement => {
    const Component = React.lazy(importFunc);

    return (
      <React.Suspense fallback={<Loading />}>
        <Component />
      </React.Suspense>
    );
  };

  const Login = createLazyComponent(() => import('./Login'));
  const Main = createLazyComponent(() => import('./Dashboard/Main'));
  const Transactions = createLazyComponent(() => import('./Transactions/Transactions'));
  const Categories = createLazyComponent(() => import('./Categories/Categories'));
  const Accounts = createLazyComponent(() => import('./Accounts/Accounts'));
  const Transfers = createLazyComponent(() => import('./Transfers/Transfers'));
  const Invoices = createLazyComponent(() => import('./Invoices/Invoices'));

  React.useEffect(() => {
    i18n.changeLanguage(iso);
    date().setLocale(iso);
  }, [iso, i18n]);

  return (
    <ThemeProvider theme={appTheme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Routes>
          <Route path={ROUTES.login.path} element={Login} />
          <Route path={ROUTES.home.path} element={<ProtectedLayout />}>
            <Route path={ROUTES.home.path} element={<Navigate to={ROUTES.dashboard.path} replace />} />
            <Route path={`${ROUTES.dashboard.path}/*`} element={Main} />
            <Route path={ROUTES.settings.path} element={<Settings />} />
            <Route path={ROUTES.profile.path} element={<Profile />} />
            <Route path={`${ROUTES.transactions.path}/*`} element={Transactions} />
            <Route path={`${ROUTES.categories.path}/*`} element={Categories} />
            <Route path={`${ROUTES.accounts.path}/*`} element={Accounts} />
            <Route path={`${ROUTES.transfers.path}/*`} element={Transfers} />
            <Route path={`${ROUTES.invoices.path}/*`} element={Invoices} />
            <Route path="*" element={<Navigate to={ROUTES.dashboard.path} replace />} />
          </Route>
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;
