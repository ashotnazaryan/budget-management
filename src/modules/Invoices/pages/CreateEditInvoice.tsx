import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'core/i18n';
import { Invoice, ManageMode } from 'shared/models';
import { ROUTES } from 'shared/constants';
import PageTitle from 'shared/components/PageTitle';
import InvoiceDocument from '../components/InvoiceDocument';
import InvoiceForm from '../components/InvoiceForm';
import { StyledPDFViewer } from './CreateEditInvoice.styles';

interface NewInvoiceProps {
  mode: ManageMode;
}

const CreateEditInvoice: React.FC<NewInvoiceProps> = ({ mode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = React.useState<Invoice>({} as Invoice);

  const goBack = React.useCallback(() => {
    navigate(`${ROUTES.invoices.path}`);
  }, [navigate]);

  const handleFormSubmit = (data: Invoice): void => {
    setInvoiceData(data);
  };

  return (
    <Box flexGrow={1}>
      <PageTitle
        withBackButton
        text={t('INVOICES.NEW_INVOICE')}
        onBackButtonClick={goBack} />
      <Grid container columnSpacing={3} rowSpacing={5}>
        <Grid item xs={12} sm={6}>
          <InvoiceForm onSubmit={handleFormSubmit} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledPDFViewer>
            <InvoiceDocument data={invoiceData} />
          </StyledPDFViewer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateEditInvoice;
