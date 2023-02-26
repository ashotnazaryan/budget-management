import * as React from 'react';
import Container from '@mui/system/Container';
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
  const [income, setIncome] = React.useState<number>(0);
  const [expense, setExpense] = React.useState<number>(0);

  const onIncomeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIncome(Number(event.target.value));
  };

  const onExpenseChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setExpense(Number(event.target.value));
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
    <Container sx={{ display: 'flex', flexDirection: 'column', flex: '300px', flexShrink: 0 }} disableGutters={true} >
      <FormControl sx={{ marginBottom: 2, width: 200 }}>
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
      <Container sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }} disableGutters={true} >
        <FormControl sx={{ marginRight: 1, width: 100 }}>
          <TextField type="number" label="Amount" value={income} onChange={onIncomeChange} />
        </FormControl>
        <Button color='primary' variant='contained' sx={{ marginBottom: 1 }} onClick={handleAddIncome}>Add Income</Button>
      </Container>
      <Container sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }} disableGutters={true} >
        <FormControl sx={{ marginRight: 1, width: 100 }}>
          <TextField type="number" label="Amount" value={expense} onChange={onExpenseChange} />
        </FormControl>
        <Button color='secondary' variant='contained' sx={{ marginBottom: 1 }} onClick={handleAddExpense}>Add Expense</Button>
      </Container>
    </Container>
  );
};

export default SummaryManager;
