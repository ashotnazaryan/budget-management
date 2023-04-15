import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
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
  selectAccountStatus
} from 'store/reducers';
import { CategoryType, Category as CategoryModel, TransactionField, TransactionDTO, Account, Currency } from 'shared/models';
import { CURRENCIES, POSITIVE_NUMERIC_REGEX, ROUTES, TABS } from 'shared/constants';
import { getCurrencySymbolByIsoCode, isPositiveString, mapCurrencyStringToNumber, transactionHelper } from 'shared/helpers';
import FormInput from 'shared/components/FormInput';
import Button from 'shared/components/Button';
import Snackbar from 'shared/components/Snackbar';
import PageTitle from 'shared/components/PageTitle';
import CategoryIcon from 'shared/components/CategoryIcon';
import Ellipsis from 'shared/components/Ellipsis';
import DatePicker from 'shared/components/DatePicker';

interface CreateEditTransactionProps {
  mode: 'create' | 'edit';
}

const CreateEditTransaction: React.FC<CreateEditTransactionProps> = ({ mode }) => {
  const regex = POSITIVE_NUMERIC_REGEX;
  const tabs = TABS;
  const currencies = CURRENCIES;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { categories } = useAppSelector(selectCategory);
  const categoryStatus = useAppSelector(selectCategoryStatus);
  const { status, error = { message: '' } } = useAppSelector(selectTransaction);
  const { accounts } = useAppSelector(selectAccount);
  const accountStatus = useAppSelector(selectAccountStatus);
  const { defaultAccount = '', defaultCurrency } = useAppSelector(selectSettings);
  const transaction = useAppSelector(selectCurrentTransaction);
  const { palette: { info: { contrastText }, error: { main } } } = useTheme();
  const loading = status === 'loading';
  const helper = transactionHelper();
  const { t } = useTranslation();
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const transactionId = state?.id || null;

  const defaultValues: Partial<TransactionDTO> = {
    amount: '' as unknown as number,
    currencyIso: defaultCurrency.iso,
    categoryId: '',
    accountId: defaultAccount || '',
    type: CategoryType.expense,
    createdAt: new Date()
  };

  const methods = useForm<TransactionDTO>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues
  });

  const { setValue, handleSubmit, control, watch } = methods;

  const watchType = watch(TransactionField.type);

  const getAccountValue = (accountId: Account['id']): string => {
    const { name, nameKey } = accounts.find(({ id }) => id === accountId) as Account;

    return nameKey ? t(nameKey) : name;
  };

  const getAccountBalanceText = (balance: Account['balance'], iso: Currency['iso']): string => {
    const symbol = getCurrencySymbolByIsoCode(iso);

    return `${symbol}${balance}`;
  };

  const handleSnackbarClose = (): void => {
    setShowSnackbar(false);
  };

  const handleTabChange = (event: React.SyntheticEvent, selectedTab: number): void => {
    setValue(TransactionField.type, selectedTab);
  };

  const handleCategoryIconClick = ({ id, name, nameKey, icon }: { id: CategoryModel['id'], name: CategoryModel['name'], nameKey: CategoryModel['nameKey'], icon: CategoryModel['icon'] }): void => {
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

  const handleCurrencyChange = (event: SelectChangeEvent): void => {
    const isoCode = event.target.value as Currency['iso'];

    setValue(TransactionField.currencyIso, isoCode, { shouldValidate: true });
  };

  const handleFormSubmit = (data: TransactionDTO): void => {
    const mappedData: TransactionDTO = {
      ...data,
      amount: Number(data.amount)
    };

    mode === 'create' ? dispatch(addTransaction(mappedData)) : dispatch(editTransaction([transactionId, mappedData]));
    setFormSubmitted(true);
  };

  const getTitle = (): string => {
    return mode === 'create' ? t('TRANSACTIONS.NEW_TRANSACTION') : t('TRANSACTIONS.EDIT_TRANSACTION');
  };

  const setFormValues = React.useCallback(() => {
    if (transaction) {
      setValue(TransactionField.categoryId, transaction.categoryId);
      setValue(TransactionField.accountId, transaction.accountId);
      setValue(TransactionField.icon, transaction.icon);
      setValue(TransactionField.amount, mapCurrencyStringToNumber(transaction.amount));
      setValue(TransactionField.currencyIso, transaction.currencyIso);
      setValue(TransactionField.type, transaction.type);
      setValue(TransactionField.createdAt, transaction.createdAt as unknown as Date);
      setValue('name', transaction.name);
    }
  }, [transaction, setValue]);

  const resetForm = React.useCallback(() => {
    dispatch(resetCurrentTransaction());
  }, [dispatch]);

  const goBack = React.useCallback(() => {
    navigate(`${mode === 'create' ? ROUTES.dashboard.path : ROUTES.transactions.path}`);
    resetForm();
  }, [navigate, resetForm, mode]);

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
  }, [goBack, loading, status, formSubmitted, dispatch]);

  React.useEffect(() => {
    if (transactionId && mode === 'edit') {
      dispatch(getTransaction(transactionId));
    }
  }, [transactionId, mode, dispatch]);

  React.useEffect(() => {
    setValue(TransactionField.currencyIso, defaultCurrency.iso);
    setValue(TransactionField.accountId, defaultAccount);
  }, [setValue, defaultAccount, defaultCurrency]);

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
      <FormProvider {...methods}>
        <Grid container flexGrow={1} rowGap={4}>
          <Grid item xs={12}>
            <Controller
              control={control}
              name={TransactionField.type}
              render={({ field }) => (
                // TODO: use Tabs component
                <MuiTabs {...field} value={field.value} onChange={handleTabChange} sx={{ marginBottom: 3 }}>
                  {
                    tabs.map(({ value, label }) => (
                      <MuiTab key={value} label={t(label)} />
                    ))
                  }
                </MuiTabs>
              )}
            />
          </Grid>
          <Grid item container xs={12} columnSpacing={2} rowGap={3} display='flex' alignItems='flex-end'>
            <Grid item sm={4} xs={12}>
              <Controller
                control={control}
                name={TransactionField.currencyIso}
                rules={{
                  required: true
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <InputLabel>{t('COMMON.CURRENCY')}</InputLabel>
                    <Select
                      fullWidth
                      variant='outlined'
                      value={field.value || defaultCurrency.iso}
                      onChange={handleCurrencyChange}
                    >
                      {currencies.map(({ iso, name, symbol }) => (
                        <MenuItem value={iso} key={iso}>{symbol} {name}</MenuItem>
                      ))}
                    </Select>
                    {error && <FormHelperText error>{t(helper.currencyIso[error.type]!.message)}</FormHelperText>}
                  </>
                )}
              />
            </Grid>
            <Grid item sm={8} xs={12}>
              <FormInput
                focused
                fullWidth
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
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name={TransactionField.accountId}
              rules={{
                required: true
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <InputLabel>{t('COMMON.ACCOUNT')}</InputLabel>
                  <Select
                    fullWidth
                    variant='outlined'
                    value={accounts.length ? (field.value || defaultAccount) : ''}
                    onChange={handleAccountChange}
                    renderValue={(value) => (
                      <Ellipsis text={getAccountValue(value)} />
                    )}
                  >
                    {accounts.map(({ id, name, nameKey, balance, currencyIso }) => (
                      <MenuItem value={id} key={id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Ellipsis text={nameKey ? t(nameKey) : name} />
                        <Typography color={isPositiveString(balance) ? contrastText : main}>{getAccountBalanceText(balance, currencyIso)}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                  {error && <FormHelperText error>{t(helper.accountId[error.type]!.message)}</FormHelperText>}
                </>
              )}
            />
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
            <Typography variant='subtitle1' color={contrastText} sx={{ marginY: 1 }}>{t('COMMON.CATEGORY')}</Typography>
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
                      categories.filter(({ type }) => type === watchType).map(({ id, name, nameKey, type, icon }) => (
                        <Grid item key={`${name}-${icon}`}>
                          <CategoryIcon id={id} name={nameKey ? t(nameKey) : name} nameKey={nameKey} type={type} selected={field.value} icon={icon} onClick={handleCategoryIconClick} />
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
      <Box display='flex' alignItems='center' justifyContent='flex-end' marginY={3}>
        <Button type='submit' variant='contained' loading={loading}
          sx={{ width: { sm: 'auto', xs: '100%' } }}
          onClick={handleSubmit(handleFormSubmit)}>
          {t('COMMON.SAVE')}
        </Button>
      </Box>
      <Snackbar open={showSnackbar} onClose={handleSnackbarClose} text={error.message} type='error' />
    </Box>
  );
};

export default CreateEditTransaction;
