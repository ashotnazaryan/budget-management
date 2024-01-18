import * as React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import type { ChartOptions } from 'chart.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'store';
import { useTranslation } from 'core/i18n';
import { getReport, selectReport } from 'store/reducers';
import { CHART_COLOR_SCHEME, MONTHS, } from 'shared/constants';
import PageTitle from 'shared/components/PageTitle';
import Skeleton from 'shared/components/Skeleton';
import EmptyState from 'shared/components/EmptyState';

ChartJS.register(ArcElement, Tooltip, Legend);

const Reports: React.FC<{}> = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { report: { reports, limit, total }, status } = useAppSelector(selectReport);
  const { palette: { info: { contrastText }, error } } = useTheme();
  const reportTotalColor = total > limit && limit ? error.main : contrastText;

  const months = reports.map((report) => {
    const monthName = MONTHS.find(({ index }) => index === report.month)?.nameKey || '';

    return t(monthName);
  });

  const values = reports.map(({ value }) => value);
  const loading = status === 'loading';

  const data: ChartData<'doughnut', number[], string> = {
    labels: months,
    datasets: [
      {
        label: t('COMMON.AMOUNT') as string,
        data: values,
        backgroundColor: CHART_COLOR_SCHEME,
        borderWidth: 1
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    aspectRatio: 1.7,
    color: contrastText,
    plugins: {
      legend: {
        display: true,
        maxWidth: 50,
        labels: {
          usePointStyle: true
        }
      }
    }
  };

  const renderContent = (): React.ReactElement => {
    if (loading) {
      return <Skeleton type='list' />;
    }

    if ((status === 'failed' || status === 'succeeded') && !reports?.length) {
      return (
        <Grid item xs={12}>
          <EmptyState text={t('REPORTS.EMPTY_TEXT')} />
        </Grid>
      );
    }

    return (
      <Box display='flex' flexDirection='column' justifyContent='center' width='100%'>
        <Doughnut data={data} options={options} />
        <Typography color={reportTotalColor} sx={{ textAlign: 'center', marginTop: 3 }}>{t('COMMON.TOTAL')}: {total}</Typography>
        {limit && (
          <Typography color={contrastText} sx={{ textAlign: 'center', marginTop: 3 }}>{t('COMMON.LIMIT')}: {limit}</Typography>
        )}
      </Box>
    );
  };

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(getReport());
    }
  }, [dispatch, status]);

  return (
    <Box display='flex' flexDirection='column' flexGrow={1}>
      <PageTitle data-testid='page-title' text={t('REPORTS.PAGE_TITLE')} />
      {renderContent()}
    </Box>
  );
};

export default Reports;
