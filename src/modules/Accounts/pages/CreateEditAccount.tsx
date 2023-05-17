import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'core/i18n';
import { useAppDispatch, useAppSelector } from 'store';
import {
  createAccount,
  deleteAccount,
  editAccount,
  getAccount,
  resetCurrentAccount,
  selectAccount,
  selectAccountError,
  selectCurrentAccount,
  selectSettings
} from 'store/reducers';
import { CURRENCIES, ACCOUNT_ICONS_LIST, NUMERIC_REGEX, ROUTES } from 'shared/constants';
import { Account, AccountDTO, AccountField, Currency, IconType, ManageMode } from 'shared/models';
import { accountHelper, mapCurrencyStringToInputString } from 'shared/helpers';
import PageTitle from 'shared/components/PageTitle';
import Button from 'shared/components/Button';
import FormInput from 'shared/components/FormInput';
import Snackbar from 'shared/components/Snackbar';
import ItemIcon from 'shared/components/ItemIcon';
import FormSelect from 'shared/components/FormSelect';
import Dialog from 'shared/components/Dialog';
import Skeleton from 'shared/components/Skeleton';
import EmptyState from 'shared/components/EmptyState';

interface CreateEditAccountProps {
  mode: ManageMode;
}

const CreateEditAccount: React.FC<CreateEditAccountProps> = ({ mode }) => {
  const regex = NUMERIC_REGEX;
  const currencies = CURRENCIES;
  const icons = ACCOUNT_ICONS_LIST;
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const { palette: { info: { contrastText } } } = useTheme();
  const { status, currentStatus, deleteStatus } = useAppSelector(selectAccount);
  const error = useAppSelector(selectAccountError);
  const account = useAppSelector(selectCurrentAccount);
  const { defaultCurrency: { iso } } = useAppSelector(selectSettings);
  const helper = accountHelper();
  const { t } = useTranslation();
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [deleteClicked, setDeleteClicked] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false);
  const loading = status === 'loading';
  const deleteLoading = deleteStatus === 'loading';
  const accountId = state?.id as AccountDTO['id'];
  const accountName = account?.nameKey ? t(account.nameKey) : (account?.name || '');
  const isCreateMode = mode === ManageMode.create;
  const isEditMode = mode === ManageMode.edit;
  const isViewMode = mode === ManageMode.view;

  const defaultValues: Partial<Account> = {
    balance: 0 as unknown as Account['balance'],
    name: '',
    currencyIso: iso
  };

  const methods = useForm<Account>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues
  });

  const { setValue, handleSubmit, control, watch, reset } = methods;
  const watchCurrency = watch(AccountField.currencyIso);

  const handleAccountIconClick = ({ id }: { id: string }): void => {
    if (isViewMode) {
      return;
    }

    setValue(AccountField.icon, id as IconType, { shouldValidate: true });
  };

  const handleCurrencyChange = (event: SelectChangeEvent): void => {
    const iso = event.target.value as Currency['iso'];

    setValue(AccountField.currencyIso, iso, { shouldValidate: true });
  };

  const handleFormSubmit = (data: Account): void => {
    const mappedData: AccountDTO = {
      ...data,
      balance: Number(data.balance)
    };

    isEditMode ? dispatch(editAccount([accountId, mappedData])) : dispatch(createAccount(mappedData));
    setFormSubmitted(true);
  };

  const handleCancelButtonClick = (): void => {
    isCreateMode ? reset(defaultValues) : setFormValues();

    isEditMode
      ? navigate(`${ROUTES.accounts.path}/view/${accountName}`, { state: { id: accountId } })
      : navigate(ROUTES.accounts.path);
  };

  const handleDeleteAccount = (): void => {
    dispatch(deleteAccount(accountId));
    setDeleteClicked(true);
  };

  const handleSnackbarClose = (): void => {
    setShowSnackbar(false);
    setDeleteClicked(false);
  };

  const getTitle = (): string => {
    if (isCreateMode) {
      return t('ACCOUNTS.NEW_ACCOUNT');
    } else if (account && (isEditMode || isViewMode)) {
      return accountName;
    } else if (currentStatus !== 'loading') {
      return t('ACCOUNTS.EMPTY_TITLE');
    }

    return '';
  };

  const handleOpenDialog = (): void => {
    setDialogOpened(true);
  };

  const handleCloseDialog = (): void => {
    setDialogOpened(false);
  };

  const handleEditButtonClick = (): void => {
    if (isEditMode) {
      return;
    }

    navigate(`${ROUTES.accounts.path}/edit/${accountName}`, { state: { id: accountId } });
  };

  const setFormValues = React.useCallback(() => {
    if (account) {
      setValue(AccountField.name, account.nameKey ? t(account.nameKey) : account.name);
      setValue(AccountField.icon, account.icon);
      setValue(AccountField.balance, mapCurrencyStringToInputString(account.balance));
      setValue(AccountField.currencyIso, account.currencyIso);
    }
  }, [account, setValue, t]);

  const resetAccount = React.useCallback(() => {
    dispatch(resetCurrentAccount());
  }, [dispatch]);

  const goBack = React.useCallback(() => {
    navigate(`${ROUTES.accounts.path}`);
    resetAccount();
  }, [navigate, resetAccount]);

  React.useEffect(() => {
    if (status === 'succeeded' && formSubmitted) {
      goBack();
      setShowSnackbar(false);
    }

    if (status === 'failed' && formSubmitted) {
      setShowSnackbar(true);
    }
  }, [goBack, status, formSubmitted]);

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
    if (accountId && currentStatus === 'idle' && (isEditMode || isViewMode) && !deleteClicked) {
      dispatch(getAccount(accountId));
    }
  }, [accountId, isEditMode, isViewMode, currentStatus, dispatch, deleteClicked]);

  React.useEffect(() => {
    setFormValues();
  }, [setFormValues]);

  React.useEffect(() => {
    return () => {
      resetAccount();
    };
  }, [resetAccount]);

  const renderContent = (): React.ReactElement => {
    if (currentStatus === 'loading') {
      return <Skeleton type='form' />;
    }

    if (!isCreateMode && (!account || !accountId)) {
      return <EmptyState text={t('ACCOUNTS.EMPTY_TEXT_RENDER_CONTENT')} />;
    }

    return (
      <FormProvider {...methods}>
        <Grid container rowGap={7}>
          <Grid item xs={12}>
            <FormInput
              InputProps={{ readOnly: isViewMode }}
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
              InputProps={{ readOnly: isViewMode }}
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
              inputProps={{ readOnly: isViewMode }}
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
              {currencies.map(({ iso, name, nameKey, symbol }) => (
                <MenuItem value={iso} key={iso}>{symbol} {nameKey ? t(nameKey) : name}</MenuItem>
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
                          <ItemIcon selected={field.value} id={name} icon={name} size={50} readonly={isViewMode} onClick={handleAccountIconClick} />
                        </Grid>
                      ))
                    }
                  </Grid>
                  {error && <FormHelperText error>{t(helper.icon[error.type]!.message)}</FormHelperText>}
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
        withEditButton={isViewMode && !!account}
        withDeleteButton={isEditMode && !!account}
        withCancelButton={!isViewMode && !!account}
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
