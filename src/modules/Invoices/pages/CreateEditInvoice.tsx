import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'core/i18n';
import { useAppDispatch, useAppSelector } from 'store';
import {
  createInvoice,
  deleteInvoice,
  editInvoice,
  getInvoice,
  getProfile,
  resetCreateEditInvoiceStatus,
  resetGetInvoiceStatus,
  resetInvoiceAmount,
  selectCurrency,
  selectCurrentInvoice,
  selectInvoice,
  selectInvoiceAmount,
  selectInvoiceError,
  selectInvoiceRate,
  selectProfile,
  selectUser,
  setGetInvoiceErrorStatus,
  setInvoiceAmount
} from 'store/reducers';
import { InvoiceAmount, Invoice, InvoiceDTO, ManageMode } from 'shared/models';
import { calculateAmount, getPageTitle, mapUserProfileToInvoice } from 'shared/helpers';
import { ROUTES } from 'shared/constants';
import PageTitle from 'shared/components/PageTitle';
import Snackbar from 'shared/components/Snackbar';
import Dialog from 'shared/components/Dialog';
import Skeleton from 'shared/components/Skeleton';
import EmptyState from 'shared/components/EmptyState';
import Device from 'shared/components/Device';
import InvoiceForm from '../components/InvoiceForm';
import PDFViewer from '../components/PDFViewer';

interface CreateEditInvoiceProps {
  mode: ManageMode;
}

const CreateEditInvoice: React.FC<CreateEditInvoiceProps> = ({ mode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getStatus, createEditStatus, deleteStatus } = useAppSelector(selectInvoice);
  const { rates, date } = useAppSelector(selectInvoiceRate);
  const amount = useAppSelector(selectInvoiceAmount);
  const invoice = useAppSelector(selectCurrentInvoice);
  const error = useAppSelector(selectInvoiceError);
  const { status: profileStatus, userProfile } = useAppSelector(selectProfile);
  const user = useAppSelector(selectUser);
  const defaultCurrency = useAppSelector(selectCurrency);
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const invoiceId = state?.id as InvoiceDTO['id'];
  const loading = createEditStatus === 'loading';
  const deleteLoading = deleteStatus === 'loading';
  const isEditMode = mode === ManageMode.edit;
  const isViewMode = mode === ManageMode.view;
  const isCreateMode = mode === ManageMode.create;
  const [invoiceData, setInvoiceData] = React.useState<Partial<InvoiceDTO>>({} as InvoiceDTO);
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [deleteClicked, setDeleteClicked] = React.useState<boolean>(false);
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const title = getPageTitle<Invoice>(mode, t, getStatus, 'INVOICES', 'NEW_INVOICE', 'EMPTY_TITLE', invoice);

  const handleFormPreview = (data: Invoice): void => {
    const amount = getAmount(data);

    dispatch(setInvoiceAmount(amount));
    setInvoiceData({ ...data, amount });
  };

  const handleFormSubmit = (data: Invoice): void => {
    const amount = getAmount(data);

    dispatch(setInvoiceAmount(amount));
    setInvoiceData({ ...data, amount });
    setFormSubmitted(true);
    isEditMode ? dispatch(editInvoice([invoiceId, { ...data, amount }])) : dispatch(createInvoice({ ...data, amount }));
  };

  const handleEditButtonClick = (): void => {
    if (isEditMode) {
      return;
    }

    navigate(`${ROUTES.invoices.path}/edit/${invoice?.name}`, { state: { id: invoiceId } });
  };

  const handleCancelButtonClick = (): void => {
    isEditMode
      ? navigate(`${ROUTES.invoices.path}/view/${invoice?.name}`, { state: { id: invoiceId } })
      : navigate(ROUTES.invoices.path);
  };

  const handleOpenDialog = (): void => {
    setDialogOpened(true);
  };

  const handleCloseDialog = (): void => {
    setDialogOpened(false);
  };

  const handleDeleteInvoice = (): void => {
    dispatch(deleteInvoice(invoiceId));
    setDeleteClicked(true);
  };

  const handleSnackbarClose = (): void => {
    setShowSnackbar(false);
    setDeleteClicked(false);
  };

  const getAmount = (data: Invoice): InvoiceAmount => {
    const { salary, vatIncluded, currencyIso } = data;
    const rate = rates.find((rate) => rate.code === currencyIso)?.value;

    return calculateAmount(defaultCurrency.iso, rate, Number(salary), vatIncluded);
  };

  const resetInvoice = React.useCallback(() => {
    dispatch(resetGetInvoiceStatus());
    dispatch(resetInvoiceAmount());
  }, [dispatch]);

  const goBack = React.useCallback(() => {
    navigate(`${ROUTES.invoices.path}`);
    resetInvoice();
    setInvoiceData({});
  }, [navigate, resetInvoice]);

  React.useEffect(() => {
    if (createEditStatus === 'succeeded' && formSubmitted) {
      setShowSnackbar(false);
      dispatch(resetCreateEditInvoiceStatus());
      goBack();
    }

    if (createEditStatus === 'failed' && formSubmitted) {
      setShowSnackbar(true);
    }
  }, [dispatch, goBack, createEditStatus, formSubmitted]);

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

  React.useEffect(() => {
    if (deleteStatus === 'succeeded' && deleteClicked) {
      goBack();
    }

    if (deleteStatus === 'failed' && deleteClicked) {
      setShowSnackbar(true);
      setDialogOpened(false);
    }
  }, [goBack, deleteStatus, deleteClicked]);

  React.useEffect(() => {
    if (!invoiceId) {
      dispatch(setGetInvoiceErrorStatus());
    }
  }, [invoiceId, dispatch]);

  React.useEffect(() => {
    if (invoiceId && getStatus === 'idle' && !isCreateMode && !deleteClicked) {
      dispatch(getInvoice(invoiceId));
    }
  }, [invoiceId, isCreateMode, getStatus, dispatch, deleteClicked]);

  React.useEffect(() => {
    if (invoice && getStatus === 'succeeded' && (isEditMode || isViewMode)) {
      setInvoiceData(invoice);
    }
  }, [invoice, isEditMode, isViewMode, getStatus, dispatch]);

  const renderContent = (): React.ReactElement => {
    if (getStatus === 'loading') {
      return <Skeleton type='form' />;
    }

    if (!isCreateMode && (!invoice || !invoiceId) && getStatus === 'failed') {
      return <EmptyState text={t('INVOICES.EMPTY_TEXT_RENDER_CONTENT')} />;
    }

    return (
      <Grid container columnSpacing={3} rowSpacing={5}>
        <Grid item xs={12} sm={6}>
          <InvoiceForm
            data={invoiceData}
            loading={loading}
            mode={mode}
            onPreview={handleFormPreview}
            onSubmit={handleFormSubmit}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Device>
            {({ isAndroid }) => (
              <PDFViewer isAndroid={isAndroid} invoiceData={invoiceData} date={date} defaultCurrency={defaultCurrency} />
            )}
          </Device>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box flexGrow={1}>
      <PageTitle
        withBackButton
        withEditButton={isViewMode && !!invoice}
        withDeleteButton={isEditMode && !!invoice}
        withCancelButton={!isViewMode && !!invoice}
        text={title}
        onBackButtonClick={goBack}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={handleOpenDialog}
        onCancelButtonClick={handleCancelButtonClick}
      />
      {renderContent()}
      <Snackbar type='error' open={showSnackbar} text={error?.messageKey ? t(error.messageKey) : error?.message || ''} onClose={handleSnackbarClose} />
      <Dialog
        fullWidth
        maxWidth='xs'
        title={t('INVOICES.DELETE_DIALOG_TITLE')!}
        actionButtonText={t('COMMON.YES')!}
        open={dialogOpened}
        loading={deleteLoading}
        onClose={handleCloseDialog}
        onAction={handleDeleteInvoice}
      >
        <Typography variant='subtitle1'>
          {t('INVOICES.DELETE_DIALOG_CONFIRM')}
        </Typography>
      </Dialog>
    </Box>
  );
};

export default CreateEditInvoice;
