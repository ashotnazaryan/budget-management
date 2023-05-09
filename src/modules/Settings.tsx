import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Box from '@mui/system/Box';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'core/i18n';
import date from 'core/date';
import { useAppDispatch, useAppSelector } from 'store';
import { addSetting, selectSettings, reset, selectApp, selectUser, selectAccount, getAccounts } from 'store/reducers';
import { CURRENCIES, LOCALES, PERIOD_OPTIONS } from 'shared/constants';
import { Account, Currency, Locale, Period } from 'shared/models';
import { getAccountLabel } from 'shared/helpers';
import PageTitle from 'shared/components/PageTitle';
import Button from 'shared/components/Button';
import Dialog from 'shared/components/Dialog';
import Balance from 'shared/components/Balance';

const Settings: React.FC = () => {
  const currencies = CURRENCIES;
  const locales = LOCALES;
  const periodOptions = PERIOD_OPTIONS;
  const { defaultCurrency: { iso }, showDecimals, isDarkTheme, locale, defaultPeriod, defaultAccount = '' } = useAppSelector(selectSettings);
  const { userId } = useAppSelector(selectUser);
  const { status } = useAppSelector(selectApp);
  const { accounts, status: accountStatus } = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();
  const { palette: { info: { contrastText } } } = useTheme();
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false);
  const { i18n, t } = useTranslation();

  const handleOpenDialog = (): void => {
    setDialogOpened(true);
  };

  const handleCloseDialog = (): void => {
    setDialogOpened(false);
  };

  const handleCurrencyChange = (event: SelectChangeEvent): void => {
    const isoCode = event.target.value as Currency['iso'];

    dispatch(addSetting([{ defaultCurrency: isoCode }, false, true]));
  };

  const handleDecimalsChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    dispatch(addSetting([{ showDecimals: checked }, false, true]));
  };

  const handleAccountChange = (event: SelectChangeEvent): void => {
    const accountId = event.target.value as Account['id'];

    dispatch(addSetting([{ defaultAccount: accountId }, false, false]));
  };

  const handlePeriodChange = (event: SelectChangeEvent): void => {
    const period = event.target.value as Period;

    dispatch(addSetting([{ defaultPeriod: period }, false, true]));
  };

  const handleThemeChange = (): void => {
    dispatch(addSetting([{ isDarkTheme: !isDarkTheme }, true, false]));
  };

  const handleChangeLanguage = (event: SelectChangeEvent): void => {
    const locale = event.target.value as Locale['iso'];

    dispatch(addSetting([{ locale }, false, true]));
    date().setLocale(locale);
    i18n.changeLanguage(locale);
  };

  const deleteUserData = (): void => {
    dispatch(reset(userId));
  };

  React.useEffect(() => {
    if (status === 'succeeded') {
      setDialogOpened(false);
    }
  }, [status, dispatch]);

  React.useEffect(() => {
    if (accountStatus === 'idle' || accountStatus === 'failed') {
      dispatch(getAccounts());
    }
  }, [dispatch, accountStatus]);

  return (
    <Box flexGrow={1}>
      <PageTitle data-testid='page-title' text={t('SETTINGS.PAGE_TITLE')} />
      <Grid container rowGap={4}>
        <Grid item xs={12}>
          <Typography variant='subtitle1' color={contrastText}>{t('SETTINGS.DEFAULT_CURRENCY')}</Typography>
          <FormControl fullWidth>
            <Select
              data-testid='default-currency'
              variant='outlined'
              value={iso}
              onChange={handleCurrencyChange}
            >
              {currencies.map(({ iso, name, nameKey, symbol }) => (
                <MenuItem value={iso} key={iso}>{symbol} {nameKey ? t(nameKey) : name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography color={contrastText}>{t('SETTINGS.DEFAULT_ACCOUNT')}</Typography>
          <FormControl fullWidth>
            <Select
              variant='outlined'
              value={accounts.length ? defaultAccount : ''}
              onChange={handleAccountChange}
              renderValue={(value) => (
                <Typography>{getAccountLabel(value, accounts, t)}</Typography>
              )}
            >
              {accounts.map(({ id, name, nameKey, balance }) => (
                <MenuItem value={id} key={id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>{nameKey ? t(nameKey) : name}</Typography>
                  <Balance balance={balance} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography color={contrastText}>{t('SETTINGS.DEFAULT_PERIOD')}</Typography>
          <FormControl fullWidth>
            <Select
              variant='outlined'
              value={defaultPeriod}
              onChange={handlePeriodChange}
            >
              {periodOptions.map(({ value, label }) => (
                <MenuItem value={value} key={value}>{t(label)}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography color={contrastText}>{t('SETTINGS.LANGUAGE')}</Typography>
          <FormControl fullWidth>
            <Select
              variant='outlined'
              value={locale.iso || i18n.language}
              onChange={handleChangeLanguage}
            >
              {locales.map(({ iso, displayName }) => (
                <MenuItem value={iso} key={iso}>{displayName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={showDecimals}
                onChange={handleDecimalsChange}
              />}
            label={
              <Typography color={contrastText}>{t('SETTINGS.SHOW_DECIMALS')}</Typography>
            }
            labelPlacement='start'
            sx={{
              '&.MuiFormControlLabel-root': {
                margin: 0
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={isDarkTheme}
                onChange={handleThemeChange}
              />}
            label={
              <Typography color={contrastText}>{t('SETTINGS.DARK_THEME')}</Typography>
            }
            labelPlacement='start'
            sx={{
              '&.MuiFormControlLabel-root': {
                margin: 0
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button color='secondary' variant='contained' sx={{ width: { sm: 'auto', xs: '100%' } }} onClick={handleOpenDialog}>{t('SETTINGS.RESET')}</Button>
        </Grid>
      </Grid>
      <Dialog
        fullWidth
        maxWidth='xs'
        title={t('SETTINGS.RESET_DIALOG_TITLE')!}
        actionButtonText={t('COMMON.YES')!}
        open={dialogOpened}
        onClose={handleCloseDialog}
        onAction={deleteUserData}
      >
        <Typography variant='subtitle1'>
          {t('SETTINGS.RESET_DIALOG_CONFIRM')}
        </Typography>
      </Dialog>
    </Box>
  );
};

export default Settings;
