import * as React from 'react';
import { useTranslation } from 'react-i18next';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Box from '@mui/system/Box';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'store';
import { addSetting, selectSettings, eraseUserData, selectApp, selectUser, selectAccount, getAccounts } from 'store/reducers';
import { CURRENCIES, LANGUAGES } from 'shared/constants';
import { Account, Currency, Language } from 'shared/models';
import PageTitle from 'shared/components/PageTitle';
import Button from 'shared/components/Button';
import Dialog from 'shared/components/Dialog';

const Settings: React.FC = () => {
  const currencies = CURRENCIES;
  const languages = LANGUAGES;
  const { defaultCurrency: { iso }, showDecimals, isDarkTheme, language, defaultAccount = '' } = useAppSelector(selectSettings);
  const { userId } = useAppSelector(selectUser);
  const { status } = useAppSelector(selectApp);
  const { accounts } = useAppSelector(selectAccount);
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

    dispatch(addSetting([{ defaultCurrency: isoCode }]));
  };

  const handleDecimalsChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    dispatch(addSetting([{ showDecimals: checked }]));
  };

  const handleAccountChange = (event: SelectChangeEvent): void => {
    const accountId = event.target.value as Account['id'];

    dispatch(addSetting([{ defaultAccount: accountId }]));
  };

  const handleThemeChange = (): void => {
    dispatch(addSetting([{ isDarkTheme: !isDarkTheme }, true]));
  };

  const handleChangeLanguage = (event: SelectChangeEvent) => {
    const language = event.target.value as Language['iso'];

    dispatch(addSetting([{ language }]));
    i18n.changeLanguage(language);
  };

  const deleteUserData = (): void => {
    dispatch(eraseUserData(userId));
  };

  React.useEffect(() => {
    if (status === 'succeeded') {
      setDialogOpened(false);
      dispatch(getAccounts());
    }
  }, [status, dispatch]);

  React.useEffect(() => {
    i18n.changeLanguage(language.iso);
  }, [language, i18n]);

  return (
    <Box flexGrow={1}>
      <PageTitle text={t('SETTINGS.PAGE_TITLE')} />
      <Grid container rowGap={4}>
        <Grid item xs={12}>
          <Typography variant='subtitle1' color={contrastText} sx={{ marginY: 2 }}>{t('SETTINGS.DEFAULT_CURRENCY')}</Typography>
          <FormControl fullWidth>
            <Select
              variant='outlined'
              value={iso}
              onChange={handleCurrencyChange}
            >
              {currencies.map(({ iso, name, symbol }) => (
                <MenuItem value={iso} key={iso}>{symbol} {name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography color={contrastText} sx={{ marginY: 2 }}>{t('SETTINGS.DEFAULT_ACCOUNT')}</Typography>
          <FormControl fullWidth>
            <Select
              variant='outlined'
              value={accounts.length ? defaultAccount : ''}
              onChange={handleAccountChange}
            >
              {accounts.map(({ id, name }) => (
                <MenuItem value={id} key={id}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography color={contrastText} sx={{ marginY: 2 }}>{t('SETTINGS.LANGUAGE')}</Typography>
          <FormControl fullWidth>
            <Select
              variant='outlined'
              value={language.iso || i18n.language}
              onChange={handleChangeLanguage}
            >
              {languages.map(({ iso, displayName }) => (
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
          <Button color='secondary' variant='contained' onClick={handleOpenDialog}>{t('SETTINGS.ERASE_USER_DATA')}</Button>
        </Grid>
      </Grid>
      <Dialog
        fullWidth
        maxWidth='xs'
        title={t('SETTINGS.ERASE_USER_DATA_DIALOG_TITLE')!}
        actionButtonText={t('COMMON.YES')!}
        open={dialogOpened}
        onClose={handleCloseDialog}
        onAction={deleteUserData}
      >
        <Typography variant='subtitle1'>
          {t('SETTINGS.ERASE_USER_DATA_DIALOG_CONFIRM')}
        </Typography>
      </Dialog>
    </Box>
  );
};

export default Settings;
