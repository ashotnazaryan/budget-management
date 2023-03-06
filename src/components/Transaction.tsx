import * as React from 'react';
import Box from '@mui/material/Box';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CategoryType, TransactionData, Category as CategoryModel, Currency } from 'shared/models';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, NUMERIC_REGEX } from 'shared/constants';
import Category from './Category';

interface TransactionProps {
  currency: Currency['iso'];
  mode?: 'create' | 'edit';
  onChange: (data: TransactionData) => void;
}

interface Tab {
  value: CategoryType;
  label: string;
}


const Transaction: React.FC<TransactionProps> = ({ currency, onChange }) => {
  const numericRegex = NUMERIC_REGEX;
  const incomeCategories = INCOME_CATEGORIES;
  const expenseCategories = EXPENSE_CATEGORIES;
  const tabs: Tab[] = [{ value: CategoryType.income, label: 'Income' }, { value: CategoryType.expense, label: 'Expense' }];

  let [transaction, setTransaction] = React.useState<TransactionData & { selectedCategory: string }>({
    id: '',
    name: '',
    amount: 0,
    type: 0,
    selectedCategory: ''
  });

  const handleTabChange = (event: React.SyntheticEvent, selectedTab: number): void => {
    transaction = {
      ...transaction,
      type: selectedTab
    };

    setTransaction(transaction);
    onChange(transaction);
  };

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    if (numericRegex.test(value)) {
      const amount = Number(value);

      transaction = {
        ...transaction,
        amount
      };
  
      setTransaction(transaction);
      onChange(transaction);
    }
  };

  const onCategoryItemClick = ({ id, name }: { id: CategoryModel['id'], name: CategoryModel['name'] }): void => {
    transaction = {
      ...transaction,
      id,
      name,
      selectedCategory: id
    };

    setTransaction(transaction);
    onChange(transaction);
  };

  return (
    <Box>
      <MuiTabs value={transaction.type} onChange={handleTabChange} sx={{ marginBottom: 3 }}>
        {
          tabs.map(({ value, label }) => (
            <MuiTab key={value} label={label} />
          ))
        }
      </MuiTabs>
      <Box display='flex' alignItems='center'>
        <FormControl sx={{ marginBottom: 2, marginRight: 2 }}>
          <TextField type='number' label='Amount' value={transaction.amount} onChange={onAmountChange} />
        </FormControl>
        <Typography>{currency}</Typography>
      </Box>
      <Typography sx={{ marginY: 1 }}>Category</Typography>
      {
        transaction.type === CategoryType.income && (
          <Grid container columnGap={2} rowGap={2}>
            {
              incomeCategories.map(({ id, name, type }) => (
                <Grid item key={id} md={2} xs={4}>
                  <Category id={id} title={name} type={type} selected={transaction.selectedCategory} onClick={onCategoryItemClick} />
                </Grid>
              ))
            }
          </Grid>
        )
      }
      {
        transaction.type === CategoryType.expense && (
          <Grid container columnGap={2} rowGap={2}>
            {
              expenseCategories.map(({ id, name, type }) => (
                <Grid item key={id} md={2} xs={4}>
                  <Category id={id} title={name} type={type} selected={transaction.selectedCategory} onClick={onCategoryItemClick} />
                </Grid>
              ))
            }
          </Grid>
        )
      }
    </Box>
  );
};

export default Transaction;
