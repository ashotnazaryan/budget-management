import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
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
  selectCurrency,
  selectAccount,
  getAccounts,
  selectSettings,
  selectCurrentTransaction,
  getTransaction,
  resetCurrentTransaction,
  editTransaction,
  getBalance,
  selectCategoryStatus,
  selectAccountStatus
} from 'store/reducers';
import { CategoryType, Category as CategoryModel, TransactionField, TransactionDTO, Account, Currency } from 'shared/models';
import { POSITIVE_NUMERIC_REGEX, ROUTES, TABS } from 'shared/constants';
import { getCurrencySymbolByIsoCode, isPositiveString, mapCurrencyStringToNumber, transactionHelper } from 'shared/helpers';
import FormInput from 'shared/components/FormInput';
import Skeleton from 'shared/components/Skeleton';
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { categories } = useAppSelector(selectCategory);
  const categoryStatus = useAppSelector(selectCategoryStatus);
  const { status, error = { message: '' } } = useAppSelector(selectTransaction);
  const { accounts } = useAppSelector(selectAccount);
  const accountStatus = useAppSelector(selectAccountStatus);
  const { iso } = useAppSelector(selectCurrency);
  const { defaultAccount = '' } = useAppSelector(selectSettings);
  const transaction = useAppSelector(selectCurrentTransaction);
  const { palette: { info: { contrastText }, error: { main } } } = useTheme();
  const loading = status === 'loading';
  const helper = transactionHelper();
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const transactionId = state?.id || null;

  const defaultValues: Partial<TransactionDTO> = {
    amount: '' as unknown as number,
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
    return accounts.find(({ id }) => id === accountId)?.name || '';
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

  const handleCategoryIconClick = ({ id, name, icon }: { id: CategoryModel['id'], name: CategoryModel['name'], icon: CategoryModel['icon'] }): void => {
    setValue(TransactionField.categoryId, id, { shouldValidate: true });
    setValue(TransactionField.icon, icon);
    setValue('name', name, { shouldValidate: true });
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
      amount: Number(data.amount)
    };

    mode === 'create' ? dispatch(addTransaction(mappedData)) : dispatch(editTransaction([transactionId, mappedData]));
    setFormSubmitted(true);
  };

  const getTitle = (): string => {
    return mode === 'create' ? 'New transaction' : 'Edit transaction';
  };

  const setFormValues = React.useCallback(() => {
    if (transaction) {
      setValue(TransactionField.categoryId, transaction.categoryId);
      setValue(TransactionField.accountId, transaction.accountId);
      setValue(TransactionField.icon, transaction.icon);
      setValue(TransactionField.amount, mapCurrencyStringToNumber(transaction.amount));
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
      dispatch(getBalance());
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
    setFormValues();
  }, [setFormValues]);

  return (
    <Box component='form' display='flex' flexDirection='column' flexGrow={1} onSubmit={handleSubmit(handleFormSubmit)}>
      <PageTitle withBackButton text={getTitle()} onBackButtonClick={goBack} />
      <FormProvider {...methods} >
        <Grid container flexDirection='column' flexGrow={1} rowGap={3}>
          <Controller
            control={control}
            name={TransactionField.type}
            render={({ field }) => (
              // TODO: use Tabs component
              <MuiTabs {...field} value={field.value} onChange={handleTabChange} sx={{ marginBottom: 3 }}>
                {
                  tabs.map(({ value, label }) => (
                    <MuiTab key={value} label={label} />
                  ))
                }
              </MuiTabs>
            )}
          />
          <Box display='flex' alignItems='baseline' sx={{ marginBottom: 2 }}>
            <Typography color={contrastText} sx={{ marginRight: 2 }}>{iso}</Typography>
            <FormInput
              focused
              fullWidth
              label='Amount'
              type='number'
              name={TransactionField.amount}
              rules={{
                required: {
                  value: true,
                  message: helper.amount.required?.message
                },
                pattern: {
                  value: regex,
                  message: helper.amount.pattern?.message
                }
              }}
            />
          </Box>
          <Controller
            control={control}
            name={TransactionField.accountId}
            rules={{
              required: true
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <InputLabel>Account</InputLabel>
                <Select
                  fullWidth
                  variant='outlined'
                  value={accounts.length ? (field.value || defaultAccount) : ''}
                  onChange={handleAccountChange}
                  renderValue={(value) => (
                    <Ellipsis text={getAccountValue(value)} />
                  )}
                >
                  {accounts.map(({ id, name, balance, currencyIso }) => (
                    <MenuItem value={id} key={id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Ellipsis text={name} />
                      <Typography color={isPositiveString(balance) ? contrastText : main}>{getAccountBalanceText(balance, currencyIso)}</Typography>
                    </MenuItem>
                  ))}
                </Select>
                {error && <FormHelperText error>{helper.accountId[error.type]?.message}</FormHelperText>}
              </>
            )}
          />
          <Controller
            control={control}
            name={TransactionField.createdAt}
            render={({ field }) => (
              <DatePicker label='Date' value={dayjs(field.value)} onChange={handleDatePickerChange} sx={{ width: '100%' }} />
            )}
          />
          <Typography variant='subtitle1' color={contrastText} sx={{ marginY: 1 }}>Category</Typography>
          <Controller
            control={control}
            name={TransactionField.categoryId}
            rules={{
              required: true
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                {
                  categoryStatus === 'loading'
                    ? <Skeleton />
                    : (
                      <Grid container {...field} columnGap={4} rowGap={4}>
                        {
                          categories.filter(({ type }) => type === watchType).map(({ id, name, type, icon }) => (
                            <Grid item key={`${name}-${icon}`}>
                              <CategoryIcon id={id} name={name} type={type} selected={field.value} icon={icon} onClick={handleCategoryIconClick} />
                            </Grid>
                          ))
                        }
                      </Grid>
                    )
                }
                {error && <FormHelperText error>{helper.categoryId[error.type]?.message}</FormHelperText>}
              </>
            )}
          />
        </Grid>
      </FormProvider>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginY: 3 }}>
        <Button type='submit' variant='contained' loading={loading} onClick={handleSubmit(handleFormSubmit)}>Save</Button>
      </Box>
      <Snackbar open={showSnackbar} onClose={handleSnackbarClose} text={error.message} type='error' />
    </Box>
  );
};

export default CreateEditTransaction;