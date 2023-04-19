import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'store';
import { createAccount, deleteAccount, editAccount, getAccount, resetCurrentAccount, selectAccount, selectAccountError, selectCurrentAccount, selectSettings } from 'store/reducers';
import { CURRENCIES, ACCOUNT_ICONS_LIST, NUMERIC_REGEX, ROUTES } from 'shared/constants';
import { AccountDTO, AccountField, Currency, IconType } from 'shared/models';
import { accountHelper, mapCurrencyStringToNumber } from 'shared/helpers';
import PageTitle from 'shared/components/PageTitle';
import Button from 'shared/components/Button';
import FormInput from 'shared/components/FormInput';
import Snackbar from 'shared/components/Snackbar';
import AccountIcon from 'shared/components/AccountIcon';
import FormSelect from 'shared/components/FormSelect';
import Dialog from 'shared/components/Dialog';

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
  const { status, deleteStatus } = useAppSelector(selectAccount);
  const error = useAppSelector(selectAccountError);
  const account = useAppSelector(selectCurrentAccount);
  const { defaultCurrency: { iso } } = useAppSelector(selectSettings);
  const loading = status === 'loading';
  const deleteLoading = deleteStatus === 'loading';
  const helper = accountHelper();
  const { t } = useTranslation();
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [deleteClicked, setDeleteClicked] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false);
  const accountId = state?.id as AccountDTO['id'];
  const isEditMode = mode === 'edit';

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

  const { setValue, handleSubmit, control, watch } = methods;
  const watchCurrency = watch(AccountField.currencyIso);

  const handleAccountIconClick = ({ id }: { id: string }): void => {
    setValue(AccountField.icon, id as IconType, { shouldValidate: true });
  };

  const handleCurrencyChange = (event: SelectChangeEvent): void => {
    const iso = event.target.value as Currency['iso'];

    setValue(AccountField.currencyIso, iso, { shouldValidate: true });
  };

  const handleFormSubmit = (data: AccountDTO): void => {
    const mappedData: AccountDTO = {
      ...data,
      balance: Number(data.balance)
    };

    isEditMode ? dispatch(editAccount([accountId, mappedData])) : dispatch(createAccount(mappedData));
    setFormSubmitted(true);
  };

  const handleDeleteAccount = (): void => {
    dispatch(deleteAccount(accountId));
    setDeleteClicked(true);
  };

  const handleSnackbarClose = (): void => {
    setShowSnackbar(false);
  };

  const getTitle = (): string => {
    return isEditMode ? t('ACCOUNTS.EDIT_ACCOUNT') : t('ACCOUNTS.NEW_ACCOUNT');
  };

  const handleOpenDialog = (): void => {
    setDialogOpened(true);
  };

  const handleCloseDialog = (): void => {
    setDialogOpened(false);
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
  }, [goBack, status, formSubmitted]);

  React.useEffect(() => {
    if (deleteStatus === 'succeeded' && deleteClicked) {
      goBack();
    }
  }, [goBack, deleteStatus, deleteClicked]);

  React.useEffect(() => {
    if (accountId && isEditMode) {
      dispatch(getAccount(accountId));
    }
  }, [accountId, isEditMode, dispatch]);

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
          <Grid container rowGap={7}>
            <Grid item xs={12}>
              <FormInput
                label={t('COMMON.NAME')}
                name={AccountField.name}
                rules={{
                  required: {
                    value: true,
                    message: t(helper.name.required!.message)
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
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
              />
            </Grid>
            <Grid item xs={12}>
              <FormSelect
                label={t('COMMON.CURRENCY')}
                name={AccountField.currencyIso}
                value={watchCurrency}
                onChange={handleCurrencyChange}
                rules={{
                  required: {
                    value: true,
                    message: t(helper.currencyIso.required!.message)
                  }
                }}
              >
                {currencies.map(({ iso, name, symbol }) => (
                  <MenuItem value={iso} key={iso}>{symbol} {name}</MenuItem>
                ))}
              </FormSelect>
            </Grid>
            <Grid item xs={12}>
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
        title={t('ACCOUNTS.DELETE_DIALOG_TITLE')!}
        actionButtonText={t('COMMON.YES')!}
        open={dialogOpened}
        loading={deleteLoading}
        onClose={handleCloseDialog}
        onAction={handleDeleteAccount}
      >
        <Typography variant='subtitle1'>
          {t('ACCOUNTS.DELETE_DIALOG_CONFIRM')}
        </Typography>
      </Dialog>
    </Box>
  );
};

export default CreateEditAccount;
