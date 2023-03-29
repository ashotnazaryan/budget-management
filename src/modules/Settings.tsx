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
import { addSetting, selectSettings, } from 'store/reducers';
import { Currency } from 'shared/models';
import PageTitle from 'shared/components/PageTitle';

const Settings: React.FC = () => {
  const currencies = CURRENCIES;
  const { currency: { iso }, showDecimals } = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  const handleCurrencyChange = (event: SelectChangeEvent): void => {
    const isoCode = event.target.value as Currency['iso'];
    const currency = currencies.find(({ iso }) => iso === isoCode) as Currency;

    dispatch(addSetting({ currency }));
  };

  const handleDecimalsChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    dispatch(addSetting({ showDecimals: checked }));
  };

  return (
    <Box>
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
      </Grid>
    </Box>
  );
};

export default Settings;
