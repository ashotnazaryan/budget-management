import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import date, { LocalizedDate } from 'core/date';
import { useTranslation } from 'core/i18n';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch, useAppSelector } from 'store';
import {
  createTransfer,
  deleteTransfer,
  editTransfer,
  getAccounts,
  getTransfer,
  resetGetTransferStatus,
  selectAccount,
  selectAccountStatus,
  selectCurrentTransfer,
  selectTransfer,
  selectTransferError,
  setGetTransferErrorStatus
} from 'store/reducers';
import { POSITIVE_NUMERIC_REGEX, ROUTES } from 'shared/constants';
import { Account, ManageMode, Transfer, TransferDTO, TransferField } from 'shared/models';
import { transferHelper, getAccountLabel, mapCurrencyStringToInputString } from 'shared/helpers';
import PageTitle from 'shared/components/PageTitle';
import Button from 'shared/components/Button';
import FormSelect from 'shared/components/FormSelect';
import FormInput from 'shared/components/FormInput';
import FormDatePicker from 'shared/components/FormDatePicker';
import Snackbar from 'shared/components/Snackbar';
import Dialog from 'shared/components/Dialog';
import Skeleton from 'shared/components/Skeleton';
import EmptyState from 'shared/components/EmptyState';
import AccountOption from 'shared/components/AccountOption';

interface CreateEditTransferProps {
  mode: ManageMode;
}

const CreateEditTransfer: React.FC<CreateEditTransferProps> = ({ mode }) => {
  const regex = POSITIVE_NUMERIC_REGEX;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { getStatus, createEditStatus, deleteStatus } = useAppSelector(selectTransfer);
  const error = useAppSelector(selectTransferError);
  const transfer = useAppSelector(selectCurrentTransfer);
  const { accounts } = useAppSelector(selectAccount);
  const accountStatus = useAppSelector(selectAccountStatus);
  const helper = transferHelper();
  const { t } = useTranslation();
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const [deleteClicked, setDeleteClicked] = React.useState<boolean>(false);
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false);
  const loading = createEditStatus === 'loading';
  const deleteLoading = deleteStatus === 'loading';
  const isCreateMode = mode === ManageMode.create;
  const isEditMode = mode === ManageMode.edit;
  const isViewMode = mode === ManageMode.view;
  const { id } = useParams() as { id: string };

  const defaultValues: Partial<Transfer> = {
    fromAccount: '' as unknown as Account,
    toAccount: '' as unknown as Account,
    amount: '',
    createdAt: isCreateMode ? date().format() : undefined,
  };

  const methods = useForm<Transfer>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues
  });

  const { handleSubmit, setValue, watch, reset } = methods;
  const watchFromAccount = watch(TransferField.fromAccount);
  const watchToAccount = watch(TransferField.toAccount);
  const watchCreatedAt = watch(TransferField.createdAt);

  const handleFromAccountChange = (event: SelectChangeEvent<Account['id']>) => {
    const fromAccount = accounts.find(({ id }) => id === event.target.value);

    setValue(TransferField.fromAccount, fromAccount!, { shouldValidate: true });
  };

  const handleToAccountChange = (event: SelectChangeEvent<Account['id']>) => {
    const toAccount = accounts.find(({ id }) => id === event.target.value);

    setValue(TransferField.toAccount, toAccount!, { shouldValidate: true });
  };

  const handleDatePickerChange = (value: LocalizedDate | null): void => {
    setValue(TransferField.createdAt, value!.format(), { shouldValidate: true });
  };

  const handleFormSubmit = (data: Transfer): void => {
    const mappedData: TransferDTO = {
      ...data,
      amount: Number(data.amount),
      fromAccount: data.fromAccount.id,
      toAccount: data.toAccount.id,
      createdAt: date(data.createdAt).toDate()
    };

    isEditMode
      ? dispatch(editTransfer([id, mappedData]))
      : dispatch(createTransfer(mappedData));
    setFormSubmitted(true);
  };

  const handleCancelButtonClick = (): void => {
    isCreateMode ? reset(defaultValues) : setFormValues();

    isCreateMode
      ? navigate(ROUTES.accounts.path)
      : navigate(`${ROUTES.transfers.path}/view/${id}`);
  };

  const handleDeleteTransfer = (): void => {
    dispatch(deleteTransfer(id));
    setDeleteClicked(true);
  };

  const getTitle = (): string => {
    return isEditMode ? t('TRANSFERS.EDIT_TRANSFER') : (isViewMode ? t('TRANSFERS.VIEW_TRANSFER') : t('TRANSFERS.NEW_TRANSFER'));
  };

  const handleOpenDialog = (): void => {
    setDialogOpened(true);
  };

  const handleCloseDialog = (): void => {
    setDialogOpened(false);
  };

  const handleSnackbarClose = (): void => {
    setShowSnackbar(false);
    setDeleteClicked(false);
  };

  const handleEditButtonClick = (): void => {
    if (isEditMode) {
      return;
    }

    navigate(`${ROUTES.transfers.path}/edit/${id}`);
  };

  const setFormValues = React.useCallback(() => {
    if (transfer) {
      setValue(TransferField.fromAccount, transfer.fromAccount);
      setValue(TransferField.toAccount, transfer.toAccount);
      setValue(TransferField.amount, mapCurrencyStringToInputString(transfer.amount));
      setValue(TransferField.createdAt, transfer.createdAt);
    }
  }, [transfer, setValue]);

  const resetTransfer = React.useCallback(() => {
    dispatch(resetGetTransferStatus());
  }, [dispatch]);

  const goBack = React.useCallback(() => {
    isCreateMode
      ? navigate(ROUTES.accounts.path)
      : navigate(ROUTES.transfers.path);

    resetTransfer();
  }, [navigate, isCreateMode, resetTransfer]);

  React.useEffect(() => {
    if (accountStatus === 'idle') {
      dispatch(getAccounts());
    }
  }, [dispatch, accountStatus]);

  React.useEffect(() => {
    if (createEditStatus === 'succeeded' && formSubmitted) {
      dispatch(getAccounts());
      goBack();
      setShowSnackbar(false);
    }

    if (createEditStatus === 'failed' && formSubmitted) {
      setShowSnackbar(true);
    }
  }, [dispatch, goBack, createEditStatus, formSubmitted]);

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
    if (!id) {
      dispatch(setGetTransferErrorStatus());
    }
  }, [id, dispatch]);

  React.useEffect(() => {
    if (id && getStatus === 'idle' && !isCreateMode && !deleteClicked) {
      dispatch(getTransfer(id));
    }
  }, [id, isCreateMode, getStatus, dispatch, deleteClicked]);

  React.useEffect(() => {
    setFormValues();
  }, [setFormValues]);

  React.useEffect(() => {
    return () => {
      resetTransfer();
    };
  }, [resetTransfer]);

  const renderContent = (): React.ReactElement => {
    if (getStatus === 'loading') {
      return <Skeleton type='form' />;
    }

    if (!isCreateMode && (!transfer || !id) && getStatus === 'failed') {
      return <EmptyState text={t('TRANSFERS.EMPTY_TEXT_RENDER_CONTENT')} />;
    }

    return (
      <FormProvider {...methods}>
        <Grid container rowGap={7} columnSpacing={2}>
          <Grid item sm={6} xs={12}>
            <FormSelect
              disabled={!isCreateMode}
              label={t('ACCOUNTS.FROM_ACCOUNT')}
              name={TransferField.fromAccount}
              value={watchFromAccount.id || ''}
              onChange={handleFromAccountChange}
              rules={{
                required: {
                  value: true,
                  message: t(helper.fromAccount.required!.message)
                }
              }}
              renderValue={(value) => (
                <Typography>{getAccountLabel(value, accounts, t)}</Typography>
              )}
            >
              {accounts.map((account) => (
                <MenuItem key={account.id} value={account.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <AccountOption data={account} />
                </MenuItem>
              ))}
            </FormSelect>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormSelect
              disabled={!isCreateMode}
              label={t('ACCOUNTS.TO_ACCOUNT')}
              name={TransferField.toAccount}
              value={watchToAccount.id || ''}
              onChange={handleToAccountChange}
              rules={{
                required: {
                  value: true,
                  message: t(helper.toAccount.required!.message)
                }
              }}
              renderValue={(value) => (
                <Typography>{getAccountLabel(value, accounts, t)}</Typography>
              )}
            >
              {accounts.map((account) => (
                <MenuItem key={account.id} value={account.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <AccountOption data={account} />
                </MenuItem>
              ))}
            </FormSelect>
          </Grid>
          <Grid item xs={12}>
            <FormInput
              InputProps={{ readOnly: isViewMode }}
              label={t('COMMON.AMOUNT')}
              type='number'
              name={TransferField.amount}
              rules={{
                required: {
                  value: true,
                  message: t(helper.amount.required!.message)
                },
                pattern: {
                  value: regex,
                  message: t(helper.amount.pattern!.message)
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormDatePicker
              readOnly={isViewMode}
              name={TransferField.createdAt}
              label={t('COMMON.DATE')}
              value={date(watchCreatedAt).isValid() ? date(watchCreatedAt) : null}
              maxDate={date()}
              rules={{
                required: true,
                validate: {
                  maxDate: (value: string) =>
                    Promise.resolve(date(value) <= date() || t(helper.createdAt.max!.message))
                }
              }}
              onChange={handleDatePickerChange}
              sx={{ width: '100%' }}
            />
          </Grid>
        </Grid>
      </FormProvider>
    );
  };

  return (
    <Box component='form' display='flex' flexDirection='column' flexGrow={1} onSubmit={handleSubmit(handleFormSubmit)}>
      <PageTitle
        withBackButton
        withEditButton={isViewMode  && !!transfer}
        withDeleteButton={isEditMode  && !!transfer}
        withCancelButton={!isViewMode  && !!transfer}
        text={getTitle()}
        onBackButtonClick={goBack}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={handleOpenDialog}
        onCancelButtonClick={handleCancelButtonClick}
      />
      <Box flexGrow={1}>
        {renderContent()}
      </Box>
      {!isViewMode && (
        <Grid container display='flex' justifyContent='flex-end' rowGap={2} columnGap={2} sx={{ marginTop: 4, marginBottom: 4 }}>
          <Grid item sm='auto' xs={12}>
            <Button aria-label='Save transfer' fullWidth type='submit' variant='contained' loading={loading}
              onClick={handleSubmit(handleFormSubmit)}>
              {t('COMMON.SAVE')}
            </Button>
          </Grid>
        </Grid>
      )}
      <Snackbar type='error' open={showSnackbar} text={error?.messageKey ? t(error.messageKey) : error?.message || ''} onClose={handleSnackbarClose} />
      <Dialog
        fullWidth
        maxWidth='xs'
        title={t('TRANSFERS.DELETE_DIALOG_TITLE')!}
        actionButtonText={t('COMMON.YES')!}
        open={dialogOpened}
        loading={deleteLoading}
        onClose={handleCloseDialog}
        onAction={handleDeleteTransfer}
      >
        <Typography variant='subtitle1'>
          {t('TRANSFERS.DELETE_DIALOG_CONFIRM')}
        </Typography>
      </Dialog>
    </Box>
  );
};

export default CreateEditTransfer;
