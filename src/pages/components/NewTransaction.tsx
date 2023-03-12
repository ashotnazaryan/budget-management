import * as React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CategoryType, TransactionData, Category as CategoryModel, Currency, TransactionField } from 'shared/models';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, NUMERIC_REGEX } from 'shared/constants';
import { transactionHelper } from 'shared/helpers';
import FormInput from 'shared/components/FormInput';
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
  const helper = transactionHelper();

  const defaultValues = {
    amount: 0,
    categoryId: '',
    type: CategoryType.income
  };

  const methods = useForm<FormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues
  });

  const watchType = methods.watch(TransactionField.type);

  const handleTabChange = (event: React.SyntheticEvent, selectedTab: number): void => {
    methods.setValue(TransactionField.type, selectedTab);
  };

  const onCategoryItemClick = ({ categoryId, name }: { categoryId: CategoryModel['id'], name: CategoryModel['name'] }): void => {
    methods.setValue(TransactionField.categoryId, categoryId, { shouldValidate: true });
    methods.setValue('name', name, { shouldValidate: true });
  };

  const onFormSubmit = (data: Partial<FormData>) => {
    const mappedData = {
      ...data,
      amount: Number(data.amount)
    } as TransactionData;

    onSubmit(mappedData);
  };

  return (
    <Box component='form' display='flex' flexDirection='column' flexGrow={1} onSubmit={methods.handleSubmit(onFormSubmit)}>
      <Box flexGrow={1}>
        <FormProvider {...methods} >
          <Controller
            control={methods.control}
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
            <FormInput
              focused
              label='Amount'
              type='number'
              name={TransactionField.amount}
              rules={{
                required: {
                  value: true,
                  message: helper.amount.required?.message
                },
                pattern: {
                  value: numericRegex,
                  message: helper.amount.pattern?.message
                }
              }}
              sx={{ marginRight: 2 }}
            />
            <Typography>{currency}</Typography>
          </Box>
          <Typography variant='subtitle1' sx={{ marginY: 1 }}>Category</Typography>
          <Controller
            control={methods.control}
            name={TransactionField.categoryId}
            rules={{
              required: true
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Grid container {...field} columnGap={8} rowGap={4}>
                  {
                    categories.filter(({ type }) => type === watchType).map(({ id, name, type, icon }) => (
                      <Grid item key={id}>
                        <Category id={id} title={name} type={type} selected={field.value} icon={icon} onClick={onCategoryItemClick} />
                      </Grid>
                    ))
                  }
                </Grid>
                <Typography color='error.main' fontSize={12}>{error ? helper.categoryId[error.type]?.message : ''}</Typography>
              </>
            )}
          />
        </FormProvider>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Button onClick={onClose} sx={{ marginRight: 2 }}>Cancel</Button>
        <Button variant='contained' onClick={methods.handleSubmit(onFormSubmit)} autoFocus>Save</Button>
      </Box>
    </Box>
  );
};

export default NewTransaction;
