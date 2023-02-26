import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Currency } from 'shared/models';
import { CURRENCIES } from 'shared/constants';

interface SummaryManagerProps {
  iso: Currency['iso'];
  addIncome: (value: number) => void;
  addExpense: (value: number) => void;
  changeCurrency: (iso: Currency['iso']) => void;
}

const SummaryManager: React.FC<SummaryManagerProps> = ({ iso, addIncome, addExpense, changeCurrency }) => {
  const currencies = CURRENCIES;
  const regex = /^[0-9\b]+$/;
  const [income, setIncome] = React.useState<number>(0);
  const [expense, setExpense] = React.useState<number>(0);

  const onIncomeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    if (regex.test(value)) {
      setIncome(Number(value));
    }
  };

  const onExpenseChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    if (regex.test(value)) {
      setExpense(Number(value));
    }
  };

  const handleAddIncome = (): void => {
    addIncome(income);
  };

  const handleAddExpense = (): void => {
    addExpense(expense);
  };

  const handleCurrencyChange = (event: SelectChangeEvent): void => {
    const isoCode = event.target.value as Currency['iso'];

    changeCurrency(isoCode);
  };

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Currency</InputLabel>
          <Select
            label="Currency"
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
        <Grid container alignItems='center' columnSpacing={2}>
          <Grid item xs={6}>
            <FormControl>
              <TextField type="number" label="Amount" value={income} onChange={onIncomeChange} />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button color='primary' variant='contained' sx={{ marginBottom: 1 }} onClick={handleAddIncome}>Add Income</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container alignItems='center' columnSpacing={2}>
          <Grid item xs={6}>
            <FormControl>
              <TextField type="number" label="Amount" value={expense} onChange={onExpenseChange} />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button color='secondary' variant='contained' sx={{ marginBottom: 1 }} onClick={handleAddExpense}>Add Expense</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SummaryManager;
