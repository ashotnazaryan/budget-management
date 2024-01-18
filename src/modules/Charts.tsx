import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useAppDispatch, useAppSelector } from 'store';
import { useTranslation } from 'core/i18n';
import { getSummary, selectSettings, selectSummary, setActivePeriodFilter } from 'store/reducers';
import { mapCurrencyStringToNumber, getDateRangeForPeriod } from 'shared/helpers';
import { Period } from 'shared/models';
import { APP_COLORS, DATE_FORMAT } from 'shared/constants';
import PageTitle from 'shared/components/PageTitle';
import Skeleton from 'shared/components/Skeleton';
import EmptyState from 'shared/components/EmptyState';
import PeriodFilters from 'shared/components/PeriodFilters';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts: React.FC<{}> = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { palette: { info: { contrastText } } } = useTheme();
  const { incomes, expenses, profit, status, activePeriodFilter } = useAppSelector(selectSummary);
  const { isDarkTheme } = useAppSelector(selectSettings);
  const loading = status === 'loading';
  const { fromDate, toDate } = getDateRangeForPeriod(activePeriodFilter);
  const fromDateFormat = fromDate.format(DATE_FORMAT);
  const toDateFormat = toDate.format(DATE_FORMAT);
  const incomeNumber = mapCurrencyStringToNumber(incomes);
  const expenseNumber = mapCurrencyStringToNumber(expenses);
  const profitNumber = mapCurrencyStringToNumber(profit);
  const labels = [`${fromDateFormat} - ${toDateFormat}`];
  const primaryColor = isDarkTheme ? APP_COLORS.dark.primary : APP_COLORS.light.primary;
  const secondaryColor = isDarkTheme ? APP_COLORS.dark.secondary : APP_COLORS.light.secondary;
  const errorColor = isDarkTheme ? APP_COLORS.dark.error : APP_COLORS.light.error;
  const neutralColor = '#1a8cff';

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    color: contrastText,
    scales: {
      x: {
        ticks: {
          color: contrastText
        }
      },
      y: {
        ticks: {
          color: contrastText
        }
      }
    },
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: false
      },
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: t('COMMON.INCOME'),
        data: [incomeNumber],
        backgroundColor: primaryColor
      },
      {
        label: t('COMMON.EXPENSE'),
        data: [expenseNumber],
        backgroundColor: secondaryColor
      },
      {
        label: t('COMMON.PROFIT'),
        data: [profitNumber],
        backgroundColor: profitNumber > 0 ? neutralColor : errorColor
      },
    ],
  };

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(getSummary(activePeriodFilter));
    }
  }, [dispatch, status, activePeriodFilter]);

  const handleFilter = (period: Period): void => {
    dispatch(getSummary(period));
    dispatch(setActivePeriodFilter(period));
  };

  const renderContent = (): React.ReactElement => {
    if (loading) {
      return <Skeleton type='list' sx={{ marginTop: 2 }} />;
    }

    if ((status === 'failed')) {
      return (
        <Grid item xs={12}>
          <EmptyState text={t('CHARTS.EMPTY_TEXT')} />
        </Grid>
      );
    }

    return (
      <Box display='flex' flexDirection='column' flexGrow={1} width='100%'>
        <Bar options={options} data={data} />
      </Box>
    );
  };

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(getSummary(activePeriodFilter));
    }
  }, [dispatch, status, activePeriodFilter]);

  return (
    <Box display='flex' flexDirection='column' flexGrow={1} sx={{ paddingBottom: 3 }}>
      <PageTitle data-testid='page-title' text={t('CHARTS.PAGE_TITLE')} />
      <PeriodFilters
        transparentBackground
        selectedPeriod={activePeriodFilter}
        onFilter={handleFilter}
        sx={{ marginBottom: 3, flexGrow: 'unset' }}
      />
      {renderContent()}
    </Box>
  );
};

export default Charts;
