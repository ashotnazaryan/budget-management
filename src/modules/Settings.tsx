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
import { useAppDispatch, useAppSelector } from 'store';
import { addSetting, selectSettings, eraseUserData, selectApp, selectUser, selectAccount, getAccounts } from 'store/reducers';
import { CURRENCIES } from 'shared/constants';
import { Account, Currency } from 'shared/models';
import PageTitle from 'shared/components/PageTitle';
import Button from 'shared/components/Button';
import Dialog from 'shared/components/Dialog';
import Snackbar from 'shared/components/Snackbar';

const Settings: React.FC = () => {
  const currencies = CURRENCIES;
  const { defaultCurrency: { iso }, showDecimals, isDarkTheme, defaultAccount = '' } = useAppSelector(selectSettings);
  const { id } = useAppSelector(selectUser);
  const { status } = useAppSelector(selectApp);
  const { accounts } = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();
  const { palette: { info: { contrastText } } } = useTheme();
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);

  const handleOpenDialog = (): void => {
    setDialogOpened(true);
  };

  const handleCloseDialog = (): void => {
    setDialogOpened(false);
  };

  const handleSnackbarClose = (): void => {
    setShowSnackbar(false);
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

  const deleteUserData = (): void => {
    setFormSubmitted(true);
    dispatch(eraseUserData(id));
  };

  React.useEffect(() => {
    if (status === 'succeeded' && formSubmitted) {
      setDialogOpened(false);
      setShowSnackbar(true);
      dispatch(getAccounts());
    }
  }, [status, dispatch, formSubmitted]);

  return (
    <Box flexGrow={1}>
      <PageTitle text='Settings' />
      <Grid container rowGap={4}>
        <Grid item xs={12}>
          <Typography variant='subtitle1' color={contrastText} sx={{ marginY: 2 }}>Default currency</Typography>
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
          <Typography variant='subtitle1' color={contrastText} sx={{ marginY: 2 }}>Default account</Typography>
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
          <FormControlLabel
            control={
              <Switch
                checked={showDecimals}
                onChange={handleDecimalsChange}
              />}
            label={
              <Typography color={contrastText}>Show decimals (e.g. 1.23)</Typography>
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
              <Typography color={contrastText}>Dark theme</Typography>
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
          <Button color='secondary' variant='contained' onClick={handleOpenDialog}>Erase user data</Button>
        </Grid>
      </Grid>
      <Dialog
        fullWidth
        maxWidth='xs'
        title='Delete all data'
        actionButtonText='Yes'
        open={dialogOpened}
        onClose={handleCloseDialog}
        onAction={deleteUserData}
      >
        <Typography variant='subtitle1'>
          Are you sure you want to delete all the data? This action cannot be undone.
        </Typography>
      </Dialog>
      <Snackbar open={showSnackbar} onClose={handleSnackbarClose} text='All user data has been erased' type='success' />
    </Box>
  );
};

export default Settings;
