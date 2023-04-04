import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'store';
import { CategoryType, Category as CategoryModel, TransactionField, TransactionDTO } from 'shared/models';
import { POSITIVE_NUMERIC_REGEX, ROUTES, TABS } from 'shared/constants';
import { transactionHelper } from 'shared/helpers';
import FormInput from 'shared/components/FormInput';
import Skeleton from 'shared/components/Skeleton';
import Button from 'shared/components/Button';
import Snackbar from 'shared/components/Snackbar';
import PageTitle from 'shared/components/PageTitle';
import CategoryIcon from 'shared/components/CategoryIcon';
import {
  getCategories,
  selectCategory,
  addTransaction,
  selectTransaction,
  selectCurrency
} from 'store/reducers';

interface NewTransactionProps { }

const NewTransaction: React.FC<NewTransactionProps> = () => {
  const regex = POSITIVE_NUMERIC_REGEX;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { categories } = useAppSelector(selectCategory);
  const categoryStatus = useAppSelector(selectCategory).status;
  const { status, error = { message: '' } } = useAppSelector(selectTransaction);
  const { iso } = useAppSelector(selectCurrency);
  const { palette: { info: { contrastText }, error: { main } } } = useTheme();
  const loading = status === 'loading';
  const tabs = TABS;
  const helper = transactionHelper();
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);

  const defaultValues: Partial<TransactionDTO> = {
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

  const handleSnackbarClose = (): void => {
    setShowSnackbar(false);
  };

  const handleTabChange = (event: React.SyntheticEvent, selectedTab: number): void => {
    methods.setValue(TransactionField.type, selectedTab);
  };

  const handleCategoryIconClick = ({ id, title, icon }: { id: CategoryModel['id'], title: CategoryModel['name'], icon: CategoryModel['icon'] }): void => {
    methods.setValue(TransactionField.categoryId, id, { shouldValidate: true });
    methods.setValue(TransactionField.icon, icon);
    methods.setValue('name', title, { shouldValidate: true });
  };

  const handleFormSubmit = (data: TransactionDTO): void => {
    const mappedData: TransactionDTO = {
      ...data,
      amount: Number(data.amount)
    };

    dispatch(addTransaction(mappedData));
    setFormSubmitted(true);
  };

  const goBack = React.useCallback(() => {
    navigate(`${ROUTES.dashboard.path}`);
  }, [navigate]);

  React.useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  React.useEffect(() => {
    if (status === 'succeeded' && formSubmitted) {
      goBack();
      setShowSnackbar(false);
    } else if (status === 'failed') {
      setShowSnackbar(true);
    }
  }, [goBack, loading, status, formSubmitted]);

  return (
    <Box component='form' display='flex' flexDirection='column' flexGrow={1} onSubmit={methods.handleSubmit(handleFormSubmit)}>
      <PageTitle withBackButton text='Add new transaction' onBackButtonClick={goBack} />
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
                  value: regex,
                  message: helper.amount.pattern?.message
                }
              }}
              sx={{ marginRight: 2 }}
            />
            <Typography color={contrastText}>{iso}</Typography>
          </Box>
          <Typography variant='subtitle1' color={contrastText} sx={{ marginY: 1 }}>Category</Typography>
          <Controller
            control={methods.control}
            name={TransactionField.categoryId}
            rules={{
              required: true
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                {
                  categoryStatus === 'loading'
                    ? <Skeleton />
                    : (
                      <Grid container {...field} columnGap={4} rowGap={4}>
                        {
                          categories.filter(({ type }) => type === watchType).map(({ id, name, type, icon }) => (
                            <Grid item key={`${name}-${icon}`}>
                              <CategoryIcon id={id} title={name} type={type} selected={field.value} icon={icon} onClick={handleCategoryIconClick} />
                            </Grid>
                          ))
                        }
                      </Grid>
                    )
                }
                <Typography color={main} fontSize={12}>{error ? helper.categoryId[error.type]?.message : ''}</Typography>
              </>
            )}
          />
        </FormProvider>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginY: 3 }}>
        <Button variant='contained' onClick={methods.handleSubmit(handleFormSubmit)} loading={loading}>Save</Button>
      </Box>
      <Snackbar open={showSnackbar} onClose={handleSnackbarClose} text={error.message} type='error' />
    </Box>
  );
};

export default NewTransaction;
