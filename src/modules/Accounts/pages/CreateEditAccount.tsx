import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'store';
import { CURRENCIES, ICONS_LIST, POSITIVE_NUMERIC_REGEX, ROUTES } from 'shared/constants';
import { AccountDTO, AccountField, Currency, IconType } from 'shared/models';
import { accountHelper } from 'shared/helpers';
import PageTitle from 'shared/components/PageTitle';
import Button from 'shared/components/Button';
import FormInput from 'shared/components/FormInput';
import Snackbar from 'shared/components/Snackbar';
import AccountIcon from 'shared/components/AccountIcon';
import { createAccount, editAccount, getAccount, resetCurrentAccount, selectAccount, selectCurrentAccount, selectSettings } from 'store/reducers';

interface CreateEditAccountProps {
  mode: 'create' | 'edit';
}

const icons = ICONS_LIST;

const CreateEditAccount: React.FC<CreateEditAccountProps> = ({ mode }) => {
  const regex = POSITIVE_NUMERIC_REGEX;
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
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const accountId = state?.id || null;

  const defaultValues: Partial<AccountDTO> = {
    initialAmount: 0,
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
      initialAmount: Number(data.initialAmount)
    };

    mode === 'create' ? dispatch(createAccount(mappedData)) : dispatch(editAccount([accountId, mappedData]));
    setFormSubmitted(true);
  };

  const handleSnackbarClose = (): void => {
    setShowSnackbar(false);
  };

  const getTitle = (): string => {
    return mode === 'create' ? 'Create new account' : 'Edit account';
  };

  const setFormValues = React.useCallback(() => {
    if (account) {
      setValue(AccountField.name, account.name);
      setValue(AccountField.icon, account.icon);
      setValue(AccountField.initialAmount, Number(account.initialAmount));
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
  }, [goBack, loading, status, formSubmitted]);

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
            label='Name'
            name={AccountField.name}
            rules={{
              required: {
                value: true,
                message: helper.name.required?.message
              },
            }}
            sx={{
              marginBottom: 4
            }}
          />
          <FormInput
            label='Initial amount'
            type='number'
            name={AccountField.initialAmount}
            rules={{
              required: {
                value: true,
                message: helper.initialAmount.required?.message
              },
              pattern: {
                value: regex,
                message: helper.initialAmount.pattern?.message
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
                label='Currency'
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
          <Typography variant='subtitle1' color={contrastText} sx={{ marginY: 1 }}>Icon</Typography>
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
                <Typography color='error.main' fontSize={12} sx={{ marginTop: 2 }}>{error ? helper.icon[error.type]?.message : ''}</Typography>
              </>
            )}
          />
        </FormProvider>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginY: 3 }}>
        <Button type='submit' variant='contained' onClick={handleSubmit(handleFormSubmit)} loading={loading}>Save</Button>
      </Box>
      <Snackbar open={showSnackbar} onClose={handleSnackbarClose} text={error.message} type='error' />
    </Box>
  );
};

export default CreateEditAccount;
