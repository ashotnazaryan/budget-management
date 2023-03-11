import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/system/Box';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from 'store';
import { CURRENCIES } from 'shared/constants';
import { selectDefaultCurrency, setDefaultCurrency } from 'store/reducers';
import { Currency } from 'shared/models';

const Settings: React.FC = () => {
  const currencies = CURRENCIES;
  const { iso } = useAppSelector(selectDefaultCurrency);
  const dispatch = useAppDispatch();

  const handleCurrencyChange = (event: SelectChangeEvent): void => {
    const isoCode = event.target.value as Currency['iso'];

    dispatch(setDefaultCurrency(isoCode));
  };

  return (
    <Box>
      <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: 3 }}>Settings</Typography>
      <Typography variant='subtitle1' sx={{ marginY: 2 }}>Default currency</Typography>
      <FormControl>
        <InputLabel>Currency</InputLabel>
        <Select
          label='Currency'
          variant='outlined'
          value={iso}
          onChange={handleCurrencyChange}
          sx={{ width: 200 }}
        >
          {currencies.map(({ iso, name, symbol }) => (
            <MenuItem value={iso} key={iso}>{symbol} {name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Settings;
