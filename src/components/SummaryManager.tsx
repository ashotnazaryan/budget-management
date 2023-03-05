import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { NUMERIC_REGEX } from 'shared/constants';

interface SummaryManagerProps {
  addIncome: (value: number) => void;
  addExpense: (value: number) => void;
}

const SummaryManager: React.FC<SummaryManagerProps> = ({ addIncome, addExpense }) => {
  const numericRegex = NUMERIC_REGEX;
  const [income, setIncome] = React.useState<number>(0);
  const [expense, setExpense] = React.useState<number>(0);

  const onIncomeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    if (numericRegex.test(value)) {
      setIncome(Number(value));
    }
  };

  const onExpenseChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    if (numericRegex.test(value)) {
      setExpense(Number(value));
    }
  };

  const handleAddIncome = (): void => {
    addIncome(income);
  };

  const handleAddExpense = (): void => {
    addExpense(expense);
  };

  return (
    <Grid container rowSpacing={3}>
      <Grid item md={12} xs={12}>
      </Grid>
      <Grid item xs={12}>
        <Grid container alignItems='center' columnSpacing={2}>
          <Grid item md={4} xs={8}>
            <FormControl fullWidth>
              <TextField type='number' label='Amount' value={income} onChange={onIncomeChange} />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={4}>
            <Button fullWidth color='primary' variant='contained' sx={{ marginBottom: 1 }} onClick={handleAddIncome}>Add Income</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container alignItems='center' columnSpacing={2}>
          <Grid item md={4} xs={8}>
            <FormControl fullWidth>
              <TextField type='number' label='Amount' value={expense} onChange={onExpenseChange} />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={4}>
            <Button fullWidth color='secondary' variant='contained' sx={{ marginBottom: 1 }} onClick={handleAddExpense}>Add Expense</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SummaryManager;
