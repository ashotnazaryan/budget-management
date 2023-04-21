import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';
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
  deleteTransaction
} from 'store/reducers';
import { CategoryType, Category as CategoryModel, TransactionField, TransactionDTO, Account } from 'shared/models';
import { CATEGORY_TABS, POSITIVE_NUMERIC_REGEX, ROUTES } from 'shared/constants';
import { getCurrencySymbolByIsoCode, mapCategoryTypesWithTranslations, mapCurrencyStringToNumber, transactionHelper } from 'shared/helpers';
import FormInput from 'shared/components/FormInput';
import Button from 'shared/components/Button';
import Snackbar from 'shared/components/Snackbar';
import PageTitle from 'shared/components/PageTitle';
import CategoryIcon from 'shared/components/CategoryIcon';
import Ellipsis from 'shared/components/Ellipsis';
import DatePicker from 'shared/components/DatePicker';
import FormSelect from 'shared/components/FormSelect';
import FormRadioGroup from 'shared/components/FormRadioGroup';
import Dialog from 'shared/components/Dialog';
import Balance from 'shared/components/Balance';

interface CreateEditTransactionProps {
  mode: 'create' | 'edit';
}

const CreateEditTransaction: React.FC<CreateEditTransactionProps> = ({ mode }) => {
  const regex = POSITIVE_NUMERIC_REGEX;
  const categoryTabs = CATEGORY_TABS;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { categories } = useAppSelector(selectCategory);
  const categoryStatus = useAppSelector(selectCategoryStatus);
  const { status, deleteStatus, error = { message: '' } } = useAppSelector(selectTransaction);
  const { accounts } = useAppSelector(selectAccount);
  const accountStatus = useAppSelector(selectAccountStatus);
  const { defaultAccount = '' } = useAppSelector(selectSettings);
  const transaction = useAppSelector(selectCurrentTransaction);
  const { palette: { info: { contrastText }} } = useTheme();
  const loading = status === 'loading';
  const deleteLoading = deleteStatus === 'loading';
  const helper = transactionHelper();
  const { t } = useTranslation();
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [deleteClicked, setDeleteClicked] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false);
  const transactionId = state?.id as TransactionDTO['id'];
  const categoryType = state?.categoryType as CategoryType || CategoryType.expense;
  const isEditMode = mode === 'edit';

  const defaultValues: Partial<TransactionDTO> = {
    amount: '' as unknown as number,
    categoryId: '',
    accountId: defaultAccount || '',
    type: String(categoryType) as unknown as number,
    createdAt: new Date(),
    note: ''
  };

  const methods = useForm<TransactionDTO>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues
  });

  const { setValue, handleSubmit, control, watch } = methods;
  const watchType = watch(TransactionField.type);
  const watchAccount = watch(TransactionField.accountId);

  // TODO: move to account.hrlpers
  const getAccountValue = (accountId: Account['id']): string => {
    const { name, nameKey } = accounts.find(({ id }) => id === accountId) as Account;

    return nameKey ? t(nameKey) : name;
  };

  const getCategoryData = (data: CategoryModel): CategoryModel => {
    return {
      ...data,
      name: data.nameKey ? t(data.nameKey) : data.name
    };
  };

  const handleSnackbarClose = (): void => {
    setShowSnackbar(false);
  };

  const handleCategoryTypeChange = (value: string): void => {
    const type = Number(value) as CategoryType;

    setValue(TransactionField.type, type, { shouldValidate: true });
  };

  const handleCategoryIconClick = ({ id, name, nameKey, icon }: CategoryModel): void => {
    setValue(TransactionField.categoryId, id, { shouldValidate: true });
    setValue(TransactionField.icon, icon);
    setValue('name', name, { shouldValidate: true });
    setValue('nameKey', nameKey);
  };

  const handleAccountChange = (event: SelectChangeEvent<Account['id']>): void => {
    setValue(TransactionField.accountId, event.target.value, { shouldValidate: true });
  };

  const handleDatePickerChange = (value: Dayjs | null): void => {
    setValue(TransactionField.createdAt, value!.toDate(), { shouldValidate: true });
  };

  const handleFormSubmit = (data: TransactionDTO): void => {
    const mappedData: TransactionDTO = {
      ...data,
      amount: Number(data.amount),
      type: Number(data.type)
    };

    isEditMode ? dispatch(editTransaction([transactionId, mappedData])) : dispatch(addTransaction(mappedData));
    setFormSubmitted(true);
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

  const getTitle = (): string => {
    return isEditMode ? t('TRANSACTIONS.EDIT_TRANSACTION') : t('TRANSACTIONS.NEW_TRANSACTION');
  };

  const setFormValues = React.useCallback(() => {
    if (transaction) {
      setValue(TransactionField.categoryId, transaction.categoryId);
      setValue(TransactionField.accountId, transaction.accountId);
      setValue(TransactionField.icon, transaction.icon);
      setValue(TransactionField.amount, mapCurrencyStringToNumber(transaction.amount));
      setValue(TransactionField.type, String(transaction.type) as unknown as number);
      setValue(TransactionField.createdAt, transaction.createdAt as unknown as Date);
      setValue(TransactionField.note, transaction.note);
      setValue('name', transaction.name);
    }
  }, [transaction, setValue]);

  const resetForm = React.useCallback(() => {
    dispatch(resetCurrentTransaction());
  }, [dispatch]);

  const goBack = React.useCallback(() => {
    navigate(`${isEditMode ? ROUTES.transactions.path : ROUTES.dashboard.path}`);
    resetForm();
  }, [navigate, resetForm, isEditMode]);

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
    } else if (status === 'failed') {
      setShowSnackbar(true);
    }
  }, [dispatch, goBack, status, formSubmitted]);

  React.useEffect(() => {
    if (deleteStatus === 'succeeded' && deleteClicked) {
      goBack();
    }
  }, [goBack, deleteStatus, deleteClicked]);

  React.useEffect(() => {
    if (transactionId && isEditMode) {
      dispatch(getTransaction(transactionId));
    }
  }, [transactionId, isEditMode, dispatch]);

  React.useEffect(() => {
    setValue(TransactionField.accountId, defaultAccount);
  }, [setValue, defaultAccount]);

  React.useEffect(() => {
    setFormValues();
  }, [setFormValues]);

  React.useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  return (
    <Box component='form' display='flex' flexDirection='column' flexGrow={1} onSubmit={handleSubmit(handleFormSubmit)}>
      <PageTitle withBackButton text={getTitle()} onBackButtonClick={goBack} />
      <Box flexGrow={1}>
        <FormProvider {...methods}>
          <Grid container rowGap={5}>
            <Grid item xs={12}>
              <Typography color={contrastText}>{t('COMMON.TYPE')}</Typography>
              <FormRadioGroup
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
                  <Ellipsis text={getAccountValue(value)} />
                )}
              >
                {accounts.map(({ id, name, nameKey, balance, currencyIso }) => (
                  <MenuItem value={id} key={id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Ellipsis text={nameKey ? t(nameKey) : name} />
                    <Balance balance={balance} currencySymbol={getCurrencySymbolByIsoCode(currencyIso)} />
                  </MenuItem>
                ))}
              </FormSelect>
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name={TransactionField.createdAt}
                render={({ field }) => (
                  <DatePicker label={t('COMMON.DATE')} value={dayjs(field.value)} onChange={handleDatePickerChange} sx={{ width: '100%' }} />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
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
                            <CategoryIcon data={getCategoryData(category)} selected={field.value} onClick={handleCategoryIconClick} />
                          </Grid>
                        ))
                      }
                    </Grid>
                    {error && <FormHelperText error>{t(helper.categoryId[error.type]!.message)}</FormHelperText>}
                  </>
                )}
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
      </Box>
      <Box display='flex' alignItems='center' justifyContent='flex-end' marginY={3}>
        <Button type='submit' variant='contained' loading={loading}
          sx={{ width: { sm: 'auto', xs: '100%' } }}
          onClick={handleSubmit(handleFormSubmit)}>
          {t('COMMON.SAVE')}
        </Button>
      </Box>
      <Snackbar open={showSnackbar} onClose={handleSnackbarClose} text={error.message} type='error' />
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
