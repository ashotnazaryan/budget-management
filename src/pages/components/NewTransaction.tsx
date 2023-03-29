import * as React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useAppSelector } from 'store';
import { selectCategories, selectTransaction } from 'store/reducers';
import { CategoryType, Category as CategoryModel, Currency, TransactionField, TransactionDTO } from 'shared/models';
import { NUMERIC_REGEX, TABS } from 'shared/constants';
import { transactionHelper } from 'shared/helpers';
import FormInput from 'shared/components/FormInput';
import Skeleton from 'shared/components/Skeleton';
import Button from 'shared/components/Button';
import Category from './Category';

interface NewTransactionProps {
  currency: Currency['iso'];
  mode?: 'create' | 'edit';
  onSubmit: (data: TransactionDTO) => void;
  onClose: () => void;
}

const NewTransaction: React.FC<NewTransactionProps> = ({ currency, onSubmit, onClose }) => {
  const numericRegex = NUMERIC_REGEX;
  const { categories, status } = useAppSelector(selectCategories);
  const transactionStatus = useAppSelector(selectTransaction).status;
  const loading = transactionStatus === 'loading';
  const tabs = TABS;
  const helper = transactionHelper();

  const defaultValues = {
    amount: 0,
    categoryId: '',
    type: CategoryType.expense
  };

  const methods = useForm<TransactionDTO>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues
  });

  const watchType = methods.watch(TransactionField.type);

  const handleTabChange = (event: React.SyntheticEvent, selectedTab: number): void => {
    methods.setValue(TransactionField.type, selectedTab);
  };

  const handleCategoryItemClick = ({ categoryId, name }: { categoryId: CategoryModel['id'], name: CategoryModel['name'] }): void => {
    methods.setValue(TransactionField.categoryId, categoryId, { shouldValidate: true });
    methods.setValue('name', name, { shouldValidate: true });
  };

  const onFormSubmit = (data: TransactionDTO): void => {
    const mappedData = {
      ...data,
      amount: Number(data.amount)
    };

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
              // TODO: use Tabs component
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
                {
                  status === 'loading'
                    ? <Skeleton />
                    : (
                      <Grid container {...field} columnGap={4} rowGap={4}>
                        {
                          categories.filter(({ type }) => type === watchType).map(({ id, name, type, icon }) => (
                            <Grid item key={`${name}-${icon}`}>
                              <Category id={id} title={name} type={type} selected={field.value} icon={icon} onClick={handleCategoryItemClick} />
                            </Grid>
                          ))
                        }
                      </Grid>
                    )
                }
                <Typography color='error.main' fontSize={12}>{error ? helper.categoryId[error.type]?.message : ''}</Typography>
              </>
            )}
          />
        </FormProvider>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Button onClick={onClose} sx={{ marginRight: 2 }}>Cancel</Button>
        <Button variant='contained' onClick={methods.handleSubmit(onFormSubmit)} loading={loading} autoFocus>Save</Button>
      </Box>
    </Box>
  );
};

export default NewTransaction;
