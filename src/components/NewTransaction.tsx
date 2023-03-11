import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CategoryType, TransactionData, Category as CategoryModel, Currency, TransactionField } from 'shared/models';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, NUMERIC_REGEX } from 'shared/constants';
import Category from './Category';

interface NewTransactionProps {
  currency: Currency['iso'];
  mode?: 'create' | 'edit';
  onSubmit: (data: TransactionData) => void;
  onClose: () => void;
}

interface Tab {
  value: CategoryType;
  label: string;
}

type FormData = TransactionData;

const NewTransaction: React.FC<NewTransactionProps> = ({ currency, onSubmit, onClose }) => {
  const numericRegex = NUMERIC_REGEX;
  const categories = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];
  const tabs: Tab[] = [{ value: CategoryType.income, label: 'Income' }, { value: CategoryType.expense, label: 'Expense' }];

  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      amount: 0,
      categoryId: '',
      type: CategoryType.income
    }
  });

  // TODO: fix any type
  /* eslint-disable no-unused-vars */
  const helper: { [key in TransactionField]: any } = {
    [TransactionField.amount]: {
      required: 'Amount is required',
      pattern: 'Invalid input'
    },
    [TransactionField.categoryId]: {
      required: 'Category is required'
    },
    [TransactionField.type]: {}
  };

  const handleTabChange = (event: React.SyntheticEvent, selectedTab: number): void => {
    setValue(TransactionField.type, selectedTab);
  };

  const onCategoryItemClick = ({ categoryId, name }: { categoryId: CategoryModel['id'], name: CategoryModel['name'] }): void => {
    setValue(TransactionField.categoryId, categoryId, { shouldValidate: true });
    setValue('name', name, { shouldValidate: true });
  };

  const onFormSubmit = handleSubmit((data) => {
    const mappedData: TransactionData = {
      ...data,
      amount: Number(data.amount)
    };

    onSubmit(mappedData);
  });

  const watchType = watch(TransactionField.type);

  return (
    <Box component='form' display='flex' flexDirection='column' flexGrow={1} onSubmit={onFormSubmit}>
      <Box flexGrow={1}>
        <Controller
          control={control}
          name={TransactionField.type}
          render={({ field }) => (
            <MuiTabs {...field} value={field.value} onChange={handleTabChange} sx={{ marginBottom: 3 }}>
              {
                tabs.map(({ value, label }) => (
                  <MuiTab key={value} label={label} />
                ))
              }
            </MuiTabs>
          )}
        />
        <Box display='flex' alignItems='baseline' sx={{ marginBottom: 2 }}>
          <Controller
            control={control}
            name={TransactionField.amount}
            rules={{
              required: true,
              pattern: numericRegex
            }}
            render={({ field, fieldState: { error } }) => (
              <FormControl sx={{ marginRight: 2 }}>
                <TextField
                  {...field}
                  type='number'
                  label='Amount'
                  error={error !== undefined}
                  helperText={error ? helper.amount[error.type] : ''}
                />
              </FormControl>
            )}
          />
          <Typography>{currency}</Typography>
        </Box>
        <Typography variant='subtitle1' sx={{ marginY: 1 }}>Category</Typography>
        <Controller
          control={control}
          name={TransactionField.categoryId}
          rules={{
            required: true
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <Grid container {...field} columnGap={2} rowGap={2}>
                {
                  categories.filter(({ type }) => type === watchType).map(({ id, name, type }) => (
                    <Grid item key={id}>
                      <Category id={id} title={name} type={type} selected={field.value} onClick={onCategoryItemClick} />
                    </Grid>
                  ))
                }
              </Grid>
              <Typography color='error.main' variant='subtitle2'>{error ? helper.categoryId[error.type] : ''}</Typography>
            </>
          )}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Button onClick={onClose} sx={{ marginRight: 2 }}>Cancel</Button>
        <Button variant='contained' onClick={onFormSubmit} autoFocus>Save</Button>
      </Box>
    </Box>
  );
};

export default NewTransaction;
