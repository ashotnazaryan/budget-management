import * as React from 'react';
import Box from '@mui/material/Box';
import { useTranslation } from 'core/i18n';
import PageTitle from 'shared/components/PageTitle';

const Reports: React.FC<{}> = () => {
  const { t } = useTranslation();
  
  return (
    <Box component='form' display='flex' flexDirection='column' flexGrow={1}>
      <PageTitle data-testid='page-title' text={t('REPORTS.PAGE_TITLE')} />
    </Box>
  );
};

export default Reports;
