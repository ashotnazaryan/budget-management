import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/system/Box';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from 'store';
import { CURRENCIES } from 'shared/constants';
import { addSetting, getSettings, selectSettings, } from 'store/reducers';
import { Currency } from 'shared/models';
import PageTitle from 'shared/components/PageTitle';
import Skeleton from 'shared/components/Skeleton';

const Settings: React.FC = () => {
  const currencies = CURRENCIES;
  const { status, currency: { iso } } = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  const handleCurrencyChange = (event: SelectChangeEvent): void => {
    const isoCode = event.target.value as Currency['iso'];
    const currency = currencies.find(({ iso }) => iso === isoCode) as Currency;

    dispatch(addSetting({ currency }));
  };

  const getContent = (): React.ReactElement => {
    if (status === 'loading') {
      return <Skeleton />;
    }

    return (
      <>
        <Typography variant='subtitle1' sx={{ marginY: 2 }}>Default currency</Typography>
        <FormControl sx={{ width: { xs: '100%', sm: 200 } }}>
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
      </>
    );
  };

  const content = getContent();

  return (
    <Box>
      <PageTitle text='Settings' />
      {content}
    </Box>
  );
};

export default Settings;
