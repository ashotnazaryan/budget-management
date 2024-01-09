// InvoiceContent.js
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useTranslation } from 'core/i18n';
import { Currency, InvoiceDTO } from 'shared/models';
import Loading from 'layout/Loading';
import Button from 'shared/components/Button';
import { StyledPDFViewer } from './PDFViewer.styles';
import InvoiceDocument from './InvoiceDocument';

interface PDFViewerProps {
  isAndroid: boolean;
  invoiceData: Partial<InvoiceDTO>;
  date: string;
  defaultCurrency: Currency;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ isAndroid, invoiceData, date, defaultCurrency }) => {
  const { t } = useTranslation();
  const { palette: { info: { contrastText } } } = useTheme();

  if (isAndroid) {
    return (
      <PDFDownloadLink
        document={<InvoiceDocument data={invoiceData} saleDate={date} defaultCurrency={defaultCurrency} />}
        fileName={invoiceData.name}
      >
        {({ loading }) =>
          loading ? (
            <Loading />
          ) : (
            <Box sx={{ marginY: 2 }}>
              <Typography variant='subtitle1' color={contrastText}>
                {t('INVOICES.DOCUMENT.UNSUPPORTED_DEVICE')}
              </Typography>
              <Button
                aria-label='Download'
                fullWidth
                color='secondary'
                variant='contained'
                sx={{ marginTop: 2 }}
              >
                {t('COMMON.DOWNLOAD')}
              </Button>
            </Box>
          )
        }
      </PDFDownloadLink>
    );
  }

  return (
    <StyledPDFViewer style={{ width: '100%', height: '100vh' }}>
      <InvoiceDocument data={invoiceData} saleDate={date} defaultCurrency={defaultCurrency} />
    </StyledPDFViewer>
  );
};

export default PDFViewer;
