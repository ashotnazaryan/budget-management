import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch, useAppSelector } from 'store';
import { createTransfer, deleteTransfer, editTransfer, getAccounts, getTransfer, resetCurrentTransfer, selectAccount, selectAccountStatus, selectCurrentTransfer, selectTransfer, selectTransferError } from 'store/reducers';
import { POSITIVE_NUMERIC_REGEX, ROUTES } from 'shared/constants';
import { Account, TransferDTO, TransferField } from 'shared/models';
import { transferHelper, mapCurrencyStringToNumber } from 'shared/helpers';
import PageTitle from 'shared/components/PageTitle';
import Button from 'shared/components/Button';
import FormSelect from 'shared/components/FormSelect';
import Ellipsis from 'shared/components/Ellipsis';
import FormInput from 'shared/components/FormInput';
import FormDatePicker from 'shared/components/FormDatePicker';
import Balance from 'shared/components/Balance';
import Snackbar from 'shared/components/Snackbar';
import Dialog from 'shared/components/Dialog';
import Skeleton from 'shared/components/Skeleton';
import EmptyState from 'shared/components/EmptyState';

interface CreateEditTransferProps {
  mode: 'create' | 'edit';
}

const CreateEditTransfer: React.FC<CreateEditTransferProps> = ({ mode }) => {
  const regex = POSITIVE_NUMERIC_REGEX;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, currentStatus, deleteStatus } = useAppSelector(selectTransfer);
  const error = useAppSelector(selectTransferError);
  const transfer = useAppSelector(selectCurrentTransfer);
  const { accounts } = useAppSelector(selectAccount);
  const accountStatus = useAppSelector(selectAccountStatus);
  const helper = transferHelper();
  const { t } = useTranslation();
  const { state } = useLocation();
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const [deleteClicked, setDeleteClicked] = React.useState<boolean>(false);
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false);
  const loading = status === 'loading';
  const deleteLoading = deleteStatus === 'loading';
  const transferId = state?.id as TransferDTO['id'];
  const isEditMode = mode === 'edit';

  const defaultValues: Partial<TransferDTO> = {
    fromAccount: '',
    toAccount: '',
    amount: '' as unknown as number,
    createdAt: new Date()
  };

  const methods = useForm<TransferDTO>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues
  });

  const { handleSubmit, setValue, watch } = methods;
  const watchFromAccount = watch(TransferField.fromAccount);
  const watchToAccount = watch(TransferField.toAccount);
  const watchCreatedAt = watch(TransferField.createdAt);

  const handleSnackbarClose = (): void => {
    setShowSnackbar(false);
  };

  const handleFromAccountChange = (event: SelectChangeEvent<Account['id']>) => {
    setValue(TransferField.fromAccount, event.target.value, { shouldValidate: true });
  };

  const handleToAccountChange = (event: SelectChangeEvent<Account['id']>) => {
    setValue(TransferField.toAccount, event.target.value, { shouldValidate: true });
  };

  const handleDatePickerChange = (value: Dayjs | null): void => {
    setValue(TransferField.createdAt, value!.toDate(), { shouldValidate: true });
  };

  const handleFormSubmit = (data: TransferDTO): void => {
    const mappedData: TransferDTO = {
      ...data,
      amount: Number(data.amount)
    };

    isEditMode ? dispatch(editTransfer([transferId, mappedData])) : dispatch(createTransfer(mappedData));
    setFormSubmitted(true);
  };

  const handleDeleteTransfer = (): void => {
    dispatch(deleteTransfer(transferId));
    setDeleteClicked(true);
  };

  const getTitle = (): string => {
    return isEditMode ? t('ACCOUNTS.EDIT_TRANSFER') : t('ACCOUNTS.NEW_TRANSFER');
  };

  const handleOpenDialog = (): void => {
    setDialogOpened(true);
  };

  const handleCloseDialog = (): void => {
    setDialogOpened(false);
  };

  const setFormValues = React.useCallback(() => {
    if (transfer) {
      setValue(TransferField.fromAccount, transfer.fromAccount?.id);
      setValue(TransferField.toAccount, transfer.toAccount?.id);
      setValue(TransferField.amount, mapCurrencyStringToNumber(transfer.amount));
      setValue(TransferField.createdAt, transfer.createdAt as unknown as Date);
    }
  }, [transfer, setValue]);

  const resetForm = React.useCallback(() => {
    dispatch(resetCurrentTransfer());
  }, [dispatch]);

  // TODO: move to account.hrlpers
  const getAccountValue = (accountId: Account['id']): string => {
    const { name, nameKey } = accounts.find(({ id }) => id === accountId) as Account;

    return nameKey ? t(nameKey) : name;
  };

  const goBack = React.useCallback(() => {
    isEditMode ? navigate(`${ROUTES.transfers.path}`) : navigate(`${ROUTES.accounts.path}`);
    resetForm();
  }, [navigate, isEditMode, resetForm]);

  React.useEffect(() => {
    if (accountStatus === 'idle') {
      dispatch(getAccounts());
    }
  }, [dispatch, accountStatus]);

  React.useEffect(() => {
    if (status === 'succeeded' && formSubmitted) {
      dispatch(getAccounts());
      goBack();
      setShowSnackbar(false);
    }

    if (status === 'failed' && formSubmitted) {
      setShowSnackbar(true);
    }
  }, [dispatch, goBack, status, formSubmitted]);

  React.useEffect(() => {
    if (deleteStatus === 'succeeded' && deleteClicked) {
      goBack();
    }
  }, [goBack, deleteStatus, deleteClicked]);

  React.useEffect(() => {
    if (transferId && isEditMode) {
      dispatch(getTransfer(transferId));
    }
  }, [transferId, isEditMode, dispatch]);

  React.useEffect(() => {
    setFormValues();
  }, [setFormValues]);

  React.useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  const renderContent = (): React.ReactElement => {
    if (currentStatus === 'loading') {
      return <Skeleton />;
    }

    if (isEditMode && (!transfer || !transferId)) {
      return <EmptyState text={t('TRANSFERS.EMPTY_TEXT_RENDER_CONTENT')} />;
    }

    return (
      <FormProvider {...methods}>
        <Grid container rowGap={6} columnSpacing={2}>
          <Grid item sm={6} xs={12}>
            {/* TODO: move this component to shared */}
            <FormSelect
              label={t('ACCOUNTS.FROM_ACCOUNT')}
              name={TransferField.fromAccount}
              value={watchFromAccount}
              onChange={handleFromAccountChange}
              rules={{
                required: {
                  value: true,
                  message: t(helper.fromAccount.required!.message)
                }
              }}
              renderValue={(value) => (
                <Ellipsis text={getAccountValue(value)} />
              )}
            >
              {accounts.map(({ id, name, nameKey, balance, currencyIso }) => (
                <MenuItem value={id} key={id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Ellipsis text={nameKey ? t(nameKey) : name} />
                  <Balance balance={balance} />
                </MenuItem>
              ))}
            </FormSelect>
          </Grid>
          <Grid item sm={6} xs={12}>
            {/* TODO: move this component to shared */}
            <FormSelect
              label={t('ACCOUNTS.TO_ACCOUNT')}
              name={TransferField.toAccount}
              value={watchToAccount}
              onChange={handleToAccountChange}
              rules={{
                required: {
                  value: true,
                  message: t(helper.toAccount.required!.message)
                }
              }}
              renderValue={(value) => (
                <Ellipsis text={getAccountValue(value)} />
              )}
            >
              {accounts.map(({ id, name, nameKey, balance, currencyIso }) => (
                <MenuItem value={id} key={id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Ellipsis text={nameKey ? t(nameKey) : name} />
                  <Balance balance={balance} />
                </MenuItem>
              ))}
            </FormSelect>
          </Grid>
          <Grid item xs={12}>
            <FormInput
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
              name={TransferField.createdAt}
              label={t('COMMON.DATE')}
              value={dayjs(watchCreatedAt)}
              maxDate={dayjs()}
              rules={{
                required: true,
                validate: {
                  maxDate: (value: string) => dayjs(value) <= dayjs() || t(helper.createdAt.max!.message)
                }
              }}
              onChange={handleDatePickerChange}
              sx={{ width: '100%' }}
            />
          </Grid>
          {isEditMode && (
            <Grid item xs={12}>
              <Button color='secondary' variant='contained'
                onClick={handleOpenDialog}>
                {t('COMMON.DELETE')}
              </Button>
            </Grid>
          )}
        </Grid>
      </FormProvider>
    );
  };

  return (
    <Box component='form' display='flex' flexDirection='column' flexGrow={1} onSubmit={handleSubmit(handleFormSubmit)}>
      <PageTitle withBackButton text={getTitle()} onBackButtonClick={goBack} />
      <Box flexGrow={1}>
        {renderContent()}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginY: 3 }}>
        <Button type='submit' variant='contained' loading={loading}
          sx={{ width: { sm: 'auto', xs: '100%' } }}
          onClick={handleSubmit(handleFormSubmit)}>
          {t('COMMON.SAVE')}
        </Button>
      </Box>
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
