import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'store';
import { createAccount, editAccount, getAccount, resetCurrentAccount, selectAccount, selectCurrentAccount, selectSettings } from 'store/reducers';
import { CURRENCIES, ACCOUNT_ICONS_LIST, NUMERIC_REGEX, ROUTES } from 'shared/constants';
import { AccountDTO, AccountField, Currency, IconType } from 'shared/models';
import { accountHelper, mapCurrencyStringToNumber } from 'shared/helpers';
import PageTitle from 'shared/components/PageTitle';
import Button from 'shared/components/Button';
import FormInput from 'shared/components/FormInput';
import Snackbar from 'shared/components/Snackbar';
import AccountIcon from 'shared/components/AccountIcon';

interface CreateEditAccountProps {
  mode: 'create' | 'edit';
}

const icons = ACCOUNT_ICONS_LIST;

const CreateEditAccount: React.FC<CreateEditAccountProps> = ({ mode }) => {
  const regex = NUMERIC_REGEX;
  const currencies = CURRENCIES;
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const { palette: { info: { contrastText } } } = useTheme();
  const { status, error = { message: '' } } = useAppSelector(selectAccount);
  const account = useAppSelector(selectCurrentAccount);
  const { defaultCurrency: { iso } } = useAppSelector(selectSettings);
  const loading = status === 'loading';
  const helper = accountHelper();
  const { t } = useTranslation();
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const accountId = state?.id || null;

  const defaultValues: Partial<AccountDTO> = {
    balance: 0,
    name: '',
    currencyIso: iso
  };

  const methods = useForm<AccountDTO>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues
  });

  const { setValue, handleSubmit, control } = methods;

  const handleAccountIconClick = ({ id }: { id: string }): void => {
    setValue(AccountField.icon, id as IconType, { shouldValidate: true });
  };

  const handleCurrencyChange = (event: SelectChangeEvent): void => {
    const iso = event.target.value as Currency['iso'];

    setValue(AccountField.currencyIso, iso, { shouldValidate: true });
  };

  const handleFormSubmit = async (data: AccountDTO): Promise<void> => {
    const mappedData: AccountDTO = {
      ...data,
      balance: Number(data.balance)
    };

    mode === 'create' ? dispatch(createAccount(mappedData)) : dispatch(editAccount([accountId, mappedData]));
    setFormSubmitted(true);
  };

  const handleSnackbarClose = (): void => {
    setShowSnackbar(false);
  };

  const getTitle = (): string => {
    return mode === 'create' ? t('ACCOUNTS.NEW_ACCOUNT') : t('ACCOUNTS.EDIT_ACCOUNT');
  };

  const setFormValues = React.useCallback(() => {
    if (account) {
      setValue(AccountField.name, account.name);
      setValue(AccountField.icon, account.icon);
      setValue(AccountField.balance, mapCurrencyStringToNumber(account.balance));
      setValue(AccountField.currencyIso, account.currencyIso);
    }
  }, [account, setValue]);

  const resetForm = React.useCallback(() => {
    dispatch(resetCurrentAccount());
  }, [dispatch]);

  const goBack = React.useCallback(() => {
    navigate(`${ROUTES.accounts.path}`);
    resetForm();
  }, [navigate, resetForm]);

  React.useEffect(() => {
    if (status === 'succeeded' && formSubmitted) {
      goBack();
      setShowSnackbar(false);
    } else if (status === 'failed') {
      setShowSnackbar(true);
    }
  }, [goBack, loading, status, formSubmitted, dispatch]);

  React.useEffect(() => {
    if (accountId && mode === 'edit') {
      dispatch(getAccount(accountId));
    }
  }, [accountId, mode, dispatch]);

  React.useEffect(() => {
    setFormValues();
  }, [setFormValues]);

  return (
    <Box display='flex' flexDirection='column' component='form' flexGrow={1} onSubmit={handleSubmit(handleFormSubmit)}>
      <PageTitle withBackButton text={getTitle()} onBackButtonClick={goBack} />
      <Box flexGrow={1} display='flex' flexDirection='column'>
        <FormProvider {...methods}>
          <FormInput
            focused
            label={t('COMMON.NAME')}
            name={AccountField.name}
            rules={{
              required: {
                value: true,
                message: t(helper.name.required!.message)
              },
            }}
            sx={{
              marginBottom: 4
            }}
          />
          <FormInput
            label={t('COMMON.BALANCE')}
            type='number'
            name={AccountField.balance}
            rules={{
              required: {
                value: true,
                message: t(helper.balance.required!.message)
              },
              pattern: {
                value: regex,
                message: t(helper.balance.pattern!.message)
              }
            }}
            sx={{
              marginBottom: 4
            }}
          />
          <Controller
            control={control}
            name={AccountField.currencyIso}
            rules={{
              required: true
            }}
            render={({ field, fieldState: { error } }) => (
              <Select
                label={t('COMMON.CURRENCY')}
                variant='outlined'
                value={field.value}
                onChange={handleCurrencyChange}
              >
                {currencies.map(({ iso, name, symbol }) => (
                  <MenuItem value={iso} key={iso}>{symbol} {name}</MenuItem>
                ))}
              </Select>
            )}
          />
          <Typography variant='subtitle1' color={contrastText} sx={{ marginY: 1 }}>{t('COMMON.ICON')}</Typography>
          <Controller
            control={control}
            name={AccountField.icon}
            rules={{
              required: true
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Grid container {...field} columnGap={1} rowGap={3} sx={{ marginTop: 2 }}>
                  {
                    icons.map(({ name }) => (
                      <Grid item key={name}>
                        <AccountIcon selected={field.value} id={name} icon={name} size={50} onClick={handleAccountIconClick} />
                      </Grid>
                    ))
                  }
                </Grid>
                {error && <FormHelperText error>{t(helper.icon[error.type]!.message)}</FormHelperText>}
              </>
            )}
          />
        </FormProvider>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginY: 3 }}>
        <Button type='submit' variant='contained' loading={loading} onClick={handleSubmit(handleFormSubmit)}>{t('COMMON.SAVE')}</Button>
      </Box>
      <Snackbar open={showSnackbar} onClose={handleSnackbarClose} text={error.message} type='error' />
    </Box>
  );
};

export default CreateEditAccount;
