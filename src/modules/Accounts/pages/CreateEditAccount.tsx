import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'core/i18n';
import { useAppDispatch, useAppSelector } from 'store';
import {
  createAccount,
  deleteAccount,
  editAccount,
  getAccount,
  resetGetAccountStatus,
  selectAccount,
  selectAccountError,
  selectCurrentAccount,
  selectSettings,
  setGetAccountErrorStatus
} from 'store/reducers';
import { CURRENCIES, ACCOUNT_ICONS_LIST, NUMERIC_REGEX, ROUTES } from 'shared/constants';
import { Account, AccountDTO, AccountField, IconType, ManageMode } from 'shared/models';
import { accountHelper, getPageTitle, mapCurrencyStringToInputString } from 'shared/helpers';
import PageTitle from 'shared/components/PageTitle';
import Button from 'shared/components/Button';
import FormInput from 'shared/components/FormInput';
import Snackbar from 'shared/components/Snackbar';
import ItemIcon from 'shared/components/ItemIcon';
import FormSelect from 'shared/components/FormSelect';
import Dialog from 'shared/components/Dialog';
import Skeleton from 'shared/components/Skeleton';
import EmptyState from 'shared/components/EmptyState';
import FormIcon from 'shared/components/FormIcon';
import CurrencyInfoItem from 'shared/components/CurrencyInfoItem';

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
  const { getStatus, createEditStatus, deleteStatus } = useAppSelector(selectAccount);
  const error = useAppSelector(selectAccountError);
  const account = useAppSelector(selectCurrentAccount);
  const { defaultCurrency: { iso } } = useAppSelector(selectSettings);
  const helper = accountHelper();
  const { t } = useTranslation();
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [deleteClicked, setDeleteClicked] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false);
  const loading = createEditStatus === 'loading';
  const deleteLoading = deleteStatus === 'loading';
  const accountId = state?.id as AccountDTO['id'];
  const accountName = account?.nameKey ? t(account.nameKey) : (account?.name || '');
  const isCreateMode = mode === ManageMode.create;
  const isEditMode = mode === ManageMode.edit;
  const isViewMode = mode === ManageMode.view;
  const title = getPageTitle<Account>(mode, t, getStatus, 'ACCOUNTS', 'NEW_ACCOUNT', 'EMPTY_TITLE', account);

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

  const { setValue, handleSubmit, reset } = methods;

  const handleAccountIconClick = ({ id }: { id: string }): void => {
    if (isViewMode) {
      return;
    }

    setValue(AccountField.icon, id as IconType, { shouldValidate: true });
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
    dispatch(resetGetAccountStatus());
  }, [dispatch]);

  const goBack = React.useCallback(() => {
    navigate(`${ROUTES.accounts.path}`);
    resetAccount();
  }, [navigate, resetAccount]);

  React.useEffect(() => {
    if (createEditStatus === 'succeeded' && formSubmitted) {
      goBack();
      setShowSnackbar(false);
    }

    if (createEditStatus === 'failed' && formSubmitted) {
      setShowSnackbar(true);
    }
  }, [goBack, createEditStatus, formSubmitted]);

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
    if (!accountId) {
      dispatch(setGetAccountErrorStatus());
    }
  }, [accountId, dispatch]);

  React.useEffect(() => {
    if (accountId && getStatus === 'idle' && (isEditMode || isViewMode) && !deleteClicked) {
      dispatch(getAccount(accountId));
    }
  }, [accountId, isEditMode, isViewMode, getStatus, dispatch, deleteClicked]);

  React.useEffect(() => {
    setFormValues();
  }, [setFormValues]);

  React.useEffect(() => {
    return () => {
      resetAccount();
    };
  }, [resetAccount]);

  const renderContent = (): React.ReactElement => {
    if (getStatus === 'loading') {
      return <Skeleton type='form' />;
    }

    if (!isCreateMode && (!account || !accountId) && getStatus === 'failed') {
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
              rules={{
                required: {
                  value: true,
                  message: t(helper.currencyIso.required!.message)
                }
              }}
            >
              {currencies.map(({ iso, name, nameKey, symbol }) => (
                <MenuItem value={iso} key={iso}>
                  <CurrencyInfoItem currency={{ iso, symbol, name, nameKey }} />
                </MenuItem>
              ))}
            </FormSelect>
          </Grid>
          <Grid item xs={12}>
            <FormIcon
              name={AccountField.icon}
              label={t('COMMON.ICON')}
              rules={{
                required: {
                  value: true,
                  message: t(helper.icon.required!.message)
                }
              }}
              render={({ field }) => (
                <Grid container {...field} columnGap={1} rowGap={3} sx={{ marginTop: 2 }}>
                  {
                    icons.map(({ name }) => (
                      <Grid item key={name}>
                        <ItemIcon selected={field.value} id={name} icon={name} size={50} readonly={isViewMode} onClick={handleAccountIconClick} />
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
        withEditButton={isViewMode && !!account}
        withDeleteButton={isEditMode && !!account}
        withCancelButton={!isViewMode && !!account}
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
            <Button aria-label='Save account' fullWidth type='submit' variant='contained' loading={loading}
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
