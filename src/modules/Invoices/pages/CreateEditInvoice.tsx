import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'core/i18n';
import { useAppDispatch, useAppSelector } from 'store';
import { getExchangeRates, getProfile, selectInvoice, selectProfile, selectUser, setAmount } from 'store/reducers';
import { Currency, Invoice, ManageMode } from 'shared/models';
import { getLastDateOfPreviousMonth, mapUserProfileToInvoice } from 'shared/helpers';
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
  const { rate, amount } = useAppSelector(selectInvoice);
  const { status: profileStatus, userProfile } = useAppSelector(selectProfile);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [invoiceData, setInvoiceData] = React.useState<Partial<Invoice>>({} as Invoice);

  const goBack = React.useCallback(() => {
    navigate(`${ROUTES.invoices.path}`);
  }, [navigate]);

  React.useEffect(() => {
    setInvoiceData((prevInvoiceData) => ({ ...prevInvoiceData, amount }));
  }, [amount]);

  React.useEffect(() => {
    if (profileStatus === 'idle') {
      dispatch(getProfile());
    }

    if (profileStatus === 'succeeded') {
      const mappedInvoiceData = mapUserProfileToInvoice(user, userProfile);

      setInvoiceData((prevInvoiceData) => ({ ...prevInvoiceData, ...mappedInvoiceData }));
    }
  }, [dispatch, profileStatus, user, userProfile]);

  const handleFormSubmit = (data: Invoice): void => {
    const { salary, vatIncluded } = data;

    dispatch(setAmount({ rate, salary, vatIncluded }));
    setInvoiceData({ ...data, amount });
  };

  const handleCurrencyChange = (currencyIso: Currency['iso']): void => {
    dispatch(getExchangeRates([currencyIso, getLastDateOfPreviousMonth()]));
  };

  return (
    <Box flexGrow={1}>
      <PageTitle
        withBackButton
        text={t('INVOICES.NEW_INVOICE')}
        onBackButtonClick={goBack} />
      <Grid container columnSpacing={3} rowSpacing={5}>
        <Grid item xs={12} sm={6}>
          <InvoiceForm data={invoiceData} onSubmit={handleFormSubmit} onCurrencyChange={handleCurrencyChange} />
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
