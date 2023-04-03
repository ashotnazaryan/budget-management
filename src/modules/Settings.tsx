import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Box from '@mui/system/Box';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useAppDispatch, useAppSelector } from 'store';
import { CURRENCIES } from 'shared/constants';
import { Currency } from 'shared/models';
import PageTitle from 'shared/components/PageTitle';
import Button from 'shared/components/Button';
import Dialog from 'shared/components/Dialog';
import Snackbar from 'shared/components/Snackbar';
import { addSetting, selectSettings, eraseUserData, selectApp, selectUser } from 'store/reducers';

const Settings: React.FC = () => {
  const currencies = CURRENCIES;
  const { currency: { iso }, showDecimals } = useAppSelector(selectSettings);
  const { id } = useAppSelector(selectUser);
  const { status } = useAppSelector(selectApp);
  const loading = status === 'loading';
  const dispatch = useAppDispatch();
  const [dialogOpened, setDialogOpened] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);

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
    const currency = currencies.find(({ iso }) => iso === isoCode) as Currency;

    dispatch(addSetting({ currency }));
  };

  const handleDecimalsChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    dispatch(addSetting({ showDecimals: checked }));
  };

  const deleteUserData = (): void => {
    dispatch(eraseUserData(id));
  };

  React.useEffect(() => {
    if (status === 'succeeded') {
      setDialogOpened(false);
      setShowSnackbar(true);
    }
  }, [status]);

  return (
    <Box flexGrow={1}>
      <PageTitle text='Settings' />
      <Typography variant='subtitle1' sx={{ marginY: 2 }}>Default currency</Typography>
      <Grid container rowGap={4}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Currency</InputLabel>
            <Select
              label='Currency'
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
          <FormControlLabel
            control={
              <Switch
                checked={showDecimals}
                onChange={handleDecimalsChange}
              />}
            label='Show decimals (e.g. 1.23)'
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
      <Dialog title='Delete all data' loading={loading} actionButtonText='Yes' open={dialogOpened} onClose={handleCloseDialog} onAction={deleteUserData} fullWidth maxWidth='xs'>
        <Typography variant='subtitle1'>
          Are you sure you want to delete all the data? This action cannot be undone.
        </Typography>
      </Dialog>
      <Snackbar open={showSnackbar} onClose={handleSnackbarClose} text='All user data has been erased' type='success' />
    </Box>
  );
};

export default Settings;
