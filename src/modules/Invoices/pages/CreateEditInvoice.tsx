import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { PDFViewer } from '@react-pdf/renderer';
import { useTranslation } from 'core/i18n';
import { ManageMode } from 'shared/models';
import { ROUTES } from 'shared/constants';
import PageTitle from 'shared/components/PageTitle';
import PDFDocument from '../components/PDFDocument';

interface NewInvoiceProps {
  mode: ManageMode;
}

const CreateEditInvoice: React.FC<NewInvoiceProps> = ({ mode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goBack = React.useCallback(() => {
    navigate(`${ROUTES.invoices.path}`);
  }, [navigate]);

  return (
    <Box flexGrow={1}>
      <PageTitle
        withBackButton
        text={t('INVOICES.NEW_INVOICE')}
        onBackButtonClick={goBack} />
      <PDFViewer width='100%' height='100%'>
        <PDFDocument />
      </PDFViewer>
    </Box>
  );
};

export default CreateEditInvoice;
