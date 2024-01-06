import * as React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'store';
import { useTranslation } from 'core/i18n';
import { getReports, selectReport } from 'store/reducers';
import { CHART_COLOR_SCHEME, MONTHS } from 'shared/constants';
import PageTitle from 'shared/components/PageTitle';
import Skeleton from 'shared/components/Skeleton';

ChartJS.register(ArcElement, Tooltip, Legend);

const Reports: React.FC<{}> = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { reports, status } = useAppSelector(selectReport);
  const { palette: { info: { contrastText } } } = useTheme();
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
        borderWidth: 1,
      },
    ],
  };

  const renderContent = (): React.ReactElement => {
    if (loading) {
      return <Skeleton type='list' />;
    }

    return (
      <Box display='flex' justifyContent='center'>
        <Doughnut data={data} options={{ responsive: true, aspectRatio: 1.5, color: contrastText }} />
      </Box>
    );
  };

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(getReports());
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
