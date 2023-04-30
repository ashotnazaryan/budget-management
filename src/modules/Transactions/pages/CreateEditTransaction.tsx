import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import date, { LocalizedDate } from 'core/date';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'store';
import {
  getCategories,
  selectCategory,
  addTransaction,
  selectTransaction,
  selectAccount,
  getAccounts,
  selectSettings,
  selectCurrentTransaction,
  getTransaction,
  resetCurrentTransaction,
  editTransaction,
  selectCategoryStatus,
  selectAccountStatus,
  deleteTransaction,
  selectTransactionError
} from 'store/reducers';
import { CategoryType, Category as CategoryModel, TransactionField, TransactionDTO, Account, ManageMode, Transaction } from 'shared/models';
import { CATEGORY_TABS, POSITIVE_NUMERIC_REGEX, ROUTES } from 'shared/constants';
import { getAccountLabel, mapCategoryTypesWithTranslations, mapCurrencyStringToInputString, transactionHelper } from 'shared/helpers';
import FormInput from 'shared/components/FormInput';
import Button from 'shared/components/Button';
import Snackbar from 'shared/components/Snackbar';
import PageTitle from 'shared/components/PageTitle';
import CategoryIcon from 'shared/components/CategoryIcon';
import FormDatePicker from 'shared/components/FormDatePicker';
import FormSelect from 'shared/components/FormSelect';
import FormRadioGroup from 'shared/components/FormRadioGroup';
import Dialog from 'shared/components/Dialog';
import Balance from 'shared/components/Balance';
import Skeleton from 'shared/components/Skeleton';
import EmptyState from 'shared/components/EmptyState';

interface CreateEditTransactionProps {
  mode: ManageMode;
}

const CreateEditTransaction: React.FC<CreateEditTransactionProps> = ({ mode }) => {
  const regex = POSITIVE_NUMERIC_REGEX;
  const categoryTabs = CATEGORY_TABS;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { categories } = useAppSelector(selectCategory);
  const categoryStatus = useAppSelector(selectCategoryStatus);
  const { status, currentStatus, deleteStatus } = useAppSelector(selectTransaction);
  const error = useAppSelector(selectTransactionError);
  const { accounts } = useAppSelector(selectAccount);
  const accountStatus = useAppSelector(selectAccountStatus);
  const { defaultAccount = '' } = useAppSelector(selectSettings);
  const transaction = useAppSelector(selectCurrentTransaction);
  const { palette: { info: { contrastText } } } = useTheme();
  const helper = transactionHelper();
  const { t } = useTranslation();
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [deleteClicked, setDeleteClicked] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false); const loading = status === 'loading';
  const deleteLoading = deleteStatus === 'loading';
  const transactionId = state?.id as TransactionDTO['id'];
  const categoryType = state?.categoryType as CategoryType || CategoryType.expense;
  const isCreateMode = mode === ManageMode.create;
  const isEditMode = mode === ManageMode.edit;
  const isViewMode = mode === ManageMode.view;

  const defaultValues: Partial<Transaction> = {
    amount: '',
    categoryId: '',
    accountId: defaultAccount || '',
    type: String(categoryType) as unknown as number,
    createdAt: isCreateMode ? date().format() : undefined,
    note: ''
  };

  const methods = useForm<Transaction>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues
  });

  const { setValue, handleSubmit, control, watch, reset } = methods;
  const watchType = watch(TransactionField.type);
  const watchAccount = watch(TransactionField.accountId);
  const watchCreatedAt = watch(TransactionField.createdAt);

  const getCategoryData = (data: CategoryModel): CategoryModel => {
    return {
      ...data,
      name: data.nameKey ? t(data.nameKey) : data.name
    };
  };

  const handleCategoryTypeChange = (value: string): void => {
    const type = Number(value) as CategoryType;

    setValue(TransactionField.type, type, { shouldValidate: true });
  };

  const handleCategoryIconClick = ({ id, name, nameKey, icon }: CategoryModel): void => {
    if (isViewMode) {
      return;
    }

    setValue(TransactionField.categoryId, id, { shouldValidate: true });
    setValue(TransactionField.icon, icon);
    setValue('name', name, { shouldValidate: true });
    setValue('nameKey', nameKey);
  };

  const handleAccountChange = (event: SelectChangeEvent<Account['id']>): void => {
    setValue(TransactionField.accountId, event.target.value, { shouldValidate: true });
  };

  const handleDatePickerChange = (value: LocalizedDate | null): void => {
    setValue(TransactionField.createdAt, value!.format(), { shouldValidate: true });
  };

  const handleFormSubmit = (data: Transaction): void => {
    const mappedData: Omit<TransactionDTO, 'percentValue'> = {
      ...data,
      amount: Number(data.amount),
      type: Number(data.type),
      createdAt: date(data.createdAt).toDate()
    };

    isEditMode
      ? dispatch(editTransaction([transactionId, mappedData]))
      : dispatch(addTransaction(mappedData));
    setFormSubmitted(true);
  };

  const handleCancelButtonClick = (): void => {
    isCreateMode ? reset(defaultValues) : setFormValues();

    isCreateMode
      ? navigate(ROUTES.dashboard.path)
      : navigate(`${ROUTES.transactions.path}/view/${transaction!.name}`, { state: { id: transactionId } });
  };

  const handleDeleteTransaction = (): void => {
    dispatch(deleteTransaction(transactionId));
    setDeleteClicked(true);
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

    navigate(`${ROUTES.transactions.path}/edit/${transaction!.name}`, { state: { id: transactionId } });
  };

  const getTitle = (): string => {
    if (isCreateMode) {
      return t('TRANSACTIONS.NEW_TRANSACTION');
    } else if (transaction && (isEditMode || isViewMode)) {
      return transaction.nameKey ? t(transaction.nameKey) : transaction.name;
    }

    return '';
  };

  const setFormValues = React.useCallback(() => {
    if (transaction) {
      setValue(TransactionField.categoryId, transaction.categoryId);
      setValue(TransactionField.accountId, transaction.accountId);
      setValue(TransactionField.icon, transaction.icon);
      setValue(TransactionField.amount, mapCurrencyStringToInputString(transaction.amount));
      setValue(TransactionField.type, String(transaction.type) as unknown as number);
      setValue(TransactionField.createdAt, transaction.createdAt);
      setValue(TransactionField.note, transaction.note);
      setValue('name', transaction.name);
    }
  }, [transaction, setValue]);

  const resetTransaction = React.useCallback(() => {
    dispatch(resetCurrentTransaction());
  }, [dispatch]);

  const goBack = React.useCallback(() => {
    navigate(`${isCreateMode ? ROUTES.dashboard.path : ROUTES.transactions.path}`);
    resetTransaction();
  }, [navigate, resetTransaction, isCreateMode]);

  React.useEffect(() => {
    if (categoryStatus === 'idle') {
      dispatch(getCategories());
    }

    if (accountStatus === 'idle') {
      dispatch(getAccounts());
    }
  }, [dispatch, categoryStatus, accountStatus]);

  React.useEffect(() => {
    if (status === 'succeeded' && formSubmitted) {
      goBack();
      setShowSnackbar(false);
      dispatch(getAccounts());
    }

    if (status === 'failed' && formSubmitted) {
      setShowSnackbar(true);
    }
  }, [dispatch, goBack, status, formSubmitted]);

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
    if (transactionId && currentStatus === 'idle' && !isCreateMode && !deleteClicked) {
      dispatch(getTransaction(transactionId));
    }
  }, [transactionId, isCreateMode, currentStatus, dispatch, deleteClicked]);

  React.useEffect(() => {
    setValue(TransactionField.accountId, defaultAccount);
  }, [setValue, defaultAccount]);

  React.useEffect(() => {
    setFormValues();
  }, [setFormValues]);

  React.useEffect(() => {
    return () => {
      resetTransaction();
    };
  }, [resetTransaction]);

  const renderContent = (): React.ReactElement => {
    if (currentStatus === 'loading') {
      return <Skeleton type='form' />;
    }

    if (!isCreateMode && (!transaction || !transactionId)) {
      return <EmptyState text={t('TRANSACTIONS.EMPTY_TEXT_RENDER_CONTENT')} />;
    }

    return (
      <FormProvider {...methods}>
        <Grid container rowGap={7}>
          <Grid item xs={12}>
            <Typography color={contrastText}>{t('COMMON.TYPE')}</Typography>
            <FormRadioGroup
              disabled={isViewMode}
              name={TransactionField.type}
              rules={{
                required: {
                  value: true,
                  message: t(helper.type.required!.message)
                }
              }}
              options={mapCategoryTypesWithTranslations(categoryTabs, t)}
              labelColor={contrastText}
              value={watchType}
              onRadioChange={handleCategoryTypeChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              disabled={isViewMode}
              label={t('COMMON.AMOUNT')}
              type='number'
              name={TransactionField.amount}
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
            {/* TODO: move this component to shared */}
            <FormSelect
              disabled={isViewMode}
              label={t('COMMON.ACCOUNT')}
              name={TransactionField.accountId}
              value={accounts.length ? (watchAccount || defaultAccount) : ''}
              onChange={handleAccountChange}
              rules={{
                required: {
                  value: true,
                  message: t(helper.accountId.required!.message)
                }
              }}
              renderValue={(value) => (
                <Typography>{getAccountLabel(value, accounts, t)}</Typography>
              )}
            >
              {accounts.map(({ id, name, nameKey, balance, currencyIso }) => (
                <MenuItem value={id} key={id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>{nameKey ? t(nameKey) : name}</Typography>
                  <Balance balance={balance} />
                </MenuItem>
              ))}
            </FormSelect>
          </Grid>
          <Grid item xs={12}>
            <FormDatePicker
              disabled={isViewMode}
              name={TransactionField.createdAt}
              label={t('COMMON.DATE')}
              value={date(watchCreatedAt).isValid() ? date(watchCreatedAt) : null}
              maxDate={date()}
              rules={{
                required: true,
                validate: {
                  maxDate: (value: string) => date(value) <= date() || t(helper.createdAt.max!.message)
                }
              }}
              onChange={handleDatePickerChange}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              disabled={isViewMode}
              label={t('COMMON.NOTE')}
              name={TransactionField.note}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography color={contrastText} sx={{ marginY: 1 }}>{t('COMMON.CATEGORY')}</Typography>
            <Controller
              control={control}
              name={TransactionField.categoryId}
              rules={{
                required: true
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Grid container {...field} columnGap={4} rowGap={4}>
                    {
                      categories.filter(({ type }) => type === Number(watchType)).map((category) => (
                        <Grid item key={category.id}>
                          <CategoryIcon data={getCategoryData(category)} selected={field.value} disabled={isViewMode} onItemClick={handleCategoryIconClick} />
                        </Grid>
                      ))
                    }
                  </Grid>
                  {error && <FormHelperText error>{t(helper.categoryId[error.type]!.message)}</FormHelperText>}
                </>
              )}
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
        withEditButton={isViewMode}
        withDeleteButton={isEditMode}
        withCancelButton={!isViewMode}
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
        <Grid container display='flex' justifyContent='flex-end' rowGap={2} columnGap={2} sx={{ marginTop: 4 }}>
          <Grid item sm='auto' xs={12}>
            <Button fullWidth type='submit' variant='contained' loading={loading}
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
        title={t('TRANSACTIONS.DELETE_DIALOG_TITLE')!}
        actionButtonText={t('COMMON.YES')!}
        open={dialogOpened}
        loading={deleteLoading}
        onClose={handleCloseDialog}
        onAction={handleDeleteTransaction}
      >
        <Typography variant='subtitle1'>
          {t('TRANSACTIONS.DELETE_DIALOG_CONFIRM')}
        </Typography>
      </Dialog>
    </Box>
  );
};

export default CreateEditTransaction;
