import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import date, { LocalizedDate } from 'core/date';
import { useTranslation } from 'core/i18n';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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
  editTransaction,
  selectCategoryStatus,
  selectAccountStatus,
  deleteTransaction,
  selectTransactionError,
  resetGetTransactionStatus,
  setGetTransactionErrorStatus
} from 'store/reducers';
import { CategoryType, Category as CategoryModel, TransactionField, TransactionDTO, Account, ManageMode, Transaction, IconType } from 'shared/models';
import { TABS, POSITIVE_NUMERIC_REGEX, ROUTES } from 'shared/constants';
import { getAccountLabel, getPageTitle, mapCategoryTypesWithTranslations, mapCurrencyStringToInputString, transactionHelper } from 'shared/helpers';
import FormInput from 'shared/components/FormInput';
import Button from 'shared/components/Button';
import Snackbar from 'shared/components/Snackbar';
import PageTitle from 'shared/components/PageTitle';
import CategoryIcon from 'shared/components/CategoryIcon';
import FormDatePicker from 'shared/components/FormDatePicker';
import FormSelect from 'shared/components/FormSelect';
import FormRadioGroup from 'shared/components/FormRadioGroup';
import Dialog from 'shared/components/Dialog';
import Skeleton from 'shared/components/Skeleton';
import EmptyState from 'shared/components/EmptyState';
import AccountOption from 'shared/components/AccountOption';
import FormIcon from 'shared/components/FormIcon';

interface CreateEditTransactionProps {
  mode: ManageMode;
}

const CreateEditTransaction: React.FC<CreateEditTransactionProps> = ({ mode }) => {
  const regex = POSITIVE_NUMERIC_REGEX;
  const tabs = TABS;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { categories } = useAppSelector(selectCategory);
  const categoryStatus = useAppSelector(selectCategoryStatus);
  const { getStatus, createEditStatus, deleteStatus } = useAppSelector(selectTransaction);
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
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false);
  const loading = createEditStatus === 'loading';
  const deleteLoading = deleteStatus === 'loading';
  const transactionId = state?.id as TransactionDTO['id'];
  const transactionName = transaction?.nameKey ? t(transaction.nameKey) : (transaction?.name || '');
  const categoryType = state?.categoryType as CategoryType || CategoryType.expense;
  const isCreateMode = mode === ManageMode.create;
  const isEditMode = mode === ManageMode.edit;
  const isViewMode = mode === ManageMode.view;
  const title = getPageTitle<Transaction>(mode, t, getStatus, 'TRANSACTIONS', 'NEW_TRANSACTION', 'EMPTY_TITLE', transaction);

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

  const { setValue, handleSubmit, watch, reset } = methods;
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
    setValue(TransactionField.categoryId, defaultValues.categoryId as string);
    setValue(TransactionField.icon, defaultValues.icon as IconType);
    setValue(TransactionField.name, defaultValues.name as string);
  };

  const handleCategoryIconClick = ({ id, name, nameKey, icon }: CategoryModel): void => {
    if (isViewMode) {
      return;
    }

    setValue(TransactionField.categoryId, id, { shouldValidate: true });
    setValue(TransactionField.icon, icon);
    setValue(TransactionField.name, name, { shouldValidate: true });
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
      : navigate(`${ROUTES.transactions.path}/view/${transactionName}`, { state: { id: transactionId } });
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

    navigate(`${ROUTES.transactions.path}/edit/${transactionName}`, { state: { id: transactionId } });
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
    dispatch(resetGetTransactionStatus());
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
    if (createEditStatus === 'succeeded' && formSubmitted) {
      goBack();
      setShowSnackbar(false);
      dispatch(getAccounts());
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
    if (!transactionId) {
      dispatch(setGetTransactionErrorStatus());
    }
  }, [transactionId, dispatch]);

  React.useEffect(() => {
    if (transactionId && getStatus === 'idle' && !isCreateMode && !deleteClicked) {
      dispatch(getTransaction(transactionId));
    }
  }, [transactionId, isCreateMode, getStatus, dispatch, deleteClicked]);

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
    if (getStatus === 'loading') {
      return <Skeleton type='form' />;
    }

    if (!isCreateMode && (!transaction || !transactionId) && getStatus === 'failed') {
      return <EmptyState text={t('TRANSACTIONS.EMPTY_TEXT_RENDER_CONTENT')} />;
    }

    return (
      <FormProvider {...methods}>
        <Grid container rowGap={7}>
          <Grid item xs={12}>
            <Typography color={contrastText}>{t('COMMON.TYPE')}</Typography>
            <FormRadioGroup
              readonly={isViewMode}
              name={TransactionField.type}
              rules={{
                required: {
                  value: true,
                  message: t(helper.type.required!.message)
                }
              }}
              options={mapCategoryTypesWithTranslations(tabs, t)}
              labelColor={contrastText}
              value={watchType}
              onRadioChange={handleCategoryTypeChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              InputProps={{ readOnly: isViewMode }}
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
            <FormSelect
              inputProps={{ readOnly: isViewMode }}
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
              {accounts.map((account) => (
                <MenuItem key={account.id} value={account.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <AccountOption data={account} />
                </MenuItem>
              ))}
            </FormSelect>
          </Grid>
          <Grid item xs={12}>
            <FormDatePicker
              readOnly={isViewMode}
              name={TransactionField.createdAt}
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
          <Grid item xs={12}>
            <FormInput
              inputProps={{ readOnly: isViewMode }}
              label={t('COMMON.NOTE')}
              name={TransactionField.note}
            />
          </Grid>
          <Grid item xs={12}>
            <FormIcon
              name={TransactionField.categoryId}
              label={t('COMMON.CATEGORY')}
              rules={{
                required: {
                  value: true,
                  message: t(helper.categoryId.required!.message)
                }
              }}
              render={({ field }) => (
                <Grid container {...field} columnGap={4} rowGap={4}>
                  {
                    categories.filter(({ type }) => type === Number(watchType)).map((category) => (
                      <Grid item key={category.id}>
                        <CategoryIcon data={getCategoryData(category)} selected={field.value} readonly={isViewMode} onItemClick={handleCategoryIconClick} />
                      </Grid>
                    ))
                  }
                </Grid>
              )} />
          </Grid>
        </Grid>
      </FormProvider>
    );
  };

  return (
    <Box component='form' display='flex' flexDirection='column' flexGrow={1} onSubmit={handleSubmit(handleFormSubmit)}>
      <PageTitle
        withBackButton
        withEditButton={isViewMode && !!transaction}
        withDeleteButton={isEditMode && !!transaction}
        withCancelButton={!isViewMode && !!transaction}
        text={title}
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
            <Button aria-label='Save transaction' fullWidth type='submit' variant='contained' loading={loading}
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
