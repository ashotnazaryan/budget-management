import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'core/i18n';
import { useAppDispatch, useAppSelector } from 'store';
import { openSideBar, resetTransactionFilters, resetTransactionsStatus, selectSettings, selectSummary, selectTransaction } from 'store/reducers';
import { ROUTES } from 'shared/constants';

interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { palette: { primary: { contrastText, main } } } = useTheme();
  const navigate = useNavigate();
  const { filters: transactionFilters } = useAppSelector(selectTransaction);
  const { activePeriodFilter } = useAppSelector(selectSummary);
  const { defaultPeriod } = useAppSelector(selectSettings);

  const showSideBar = (): void => {
    dispatch(openSideBar());
  };

  const handleTransactionsClick = (): void => {
    if (transactionFilters.categoryId || (activePeriodFilter !== defaultPeriod)) {
      dispatch(resetTransactionFilters());
      dispatch(resetTransactionsStatus());
    }

    navigate(`${ROUTES.transactions.path}`);
  };

  return (
    <AppBar position='sticky' sx={{ backgroundColor: main }}>
      <Toolbar variant='dense' sx={{ paddingX: 3, minHeight: { xs: '80px' } }}>
        <Grid container alignItems='center'>
          <Grid item xs={1} display='flex' justifyContent='flex-start'>
            <IconButton aria-label='Menu icon' data-testid='menu-icon' edge='start' onClick={showSideBar}>
              <MenuIcon sx={{ color: contrastText }} />
            </IconButton>
          </Grid>
          <Grid item xs={10} display='flex' justifyContent='center'>
            <Link to={ROUTES.dashboard.path}>
              <Typography data-testid='product-name' color={contrastText} sx={{ cursor: 'pointer', textTransform: 'uppercase' }}>
                {t('PRODUCT_NAME')}
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={1} display='flex' justifyContent='flex-end'>
            <IconButton aria-label='Transactions link' edge='end' onClick={handleTransactionsClick}>
              <ListAltIcon sx={{ color: contrastText }} />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
