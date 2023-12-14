import * as React from 'react';
import Box from '@mui/system/Box';
import { useTranslation } from 'core/i18n';
import PageTitle from 'shared/components/PageTitle';

const InvoiceList: React.FC<{}> = () => {
  const { t } = useTranslation();

  return (
    <Box flexGrow={1}>
      <PageTitle text={t('INVOICES.PAGE_TITLE')} />
    </Box>
  );
};

export default InvoiceList;
