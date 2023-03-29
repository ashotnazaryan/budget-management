import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from 'store';
import { createAccount, selectAccount } from 'store/reducers';
import { ICONS_LIST, POSITIVE_NUMERIC_REGEX, ROUTES } from 'shared/constants';
import { AccountDTO, AccountField, IconType } from 'shared/models';
import { accountHelper } from 'shared/helpers';
import PageTitle from 'shared/components/PageTitle';
import Button from 'shared/components/Button';
import FormInput from 'shared/components/FormInput';
import Account from '../components/Account';

interface NewAccountProps { }

const icons = ICONS_LIST;

const NewAccount: React.FC<NewAccountProps> = () => {
  const regex = POSITIVE_NUMERIC_REGEX;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectAccount);
  const loading = status === 'loading';
  const helper = accountHelper();

  const defaultValues: Partial<AccountDTO> = {
    initialAmount: 0,
    name: ''
  };

  const methods = useForm<AccountDTO>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues
  });

  const goBack = (): void => {
    navigate(`${ROUTES.accounts.path}`);
  };

  const handleAccountIconClick = ({ id, name }: { id: string, name: string }): void => {
    methods.setValue(AccountField.icon, id as IconType, { shouldValidate: true });
  };

  const handleFormSubmit = (data: AccountDTO): void => {
    const mappedData: AccountDTO = {
      ...data,
      initialAmount: Number(data.initialAmount)
    };

    dispatch(createAccount(mappedData));
  };

  return (
    <Box display='flex' flexDirection='column' flexGrow={1}>
      <Box display='flex' alignItems='center' sx={{ marginBottom: 3 }}>
        {/* TODO: create a BackButton component */}
        <IconButton edge='start' color='primary' onClick={goBack}>
          <ArrowBackIcon />
        </IconButton>
        <PageTitle text='Create new account' sx={{ marginBottom: 0, flexGrow: 1, textAlign: 'center' }} />
      </Box>
      <Box flexGrow={1} display='flex' flexDirection='column'>
        <FormProvider {...methods}>
          <FormInput
            focused
            label='Name'
            name={AccountField.name}
            rules={{
              required: {
                value: true,
                message: helper.name.required?.message
              },
            }}
            sx={{
              marginBottom: 4
            }}
          />
          <FormInput
            label='Initial amount'
            type='number'
            name={AccountField.initialAmount}
            rules={{
              required: {
                value: true,
                message: helper.initialAmount.required?.message
              },
              pattern: {
                value: regex,
                message: helper.initialAmount.pattern?.message
              }
            }}
            sx={{
              marginBottom: 4
            }}
          />
          <Typography variant='subtitle1' sx={{ marginY: 1 }}>Icon</Typography>
          <Controller
            control={methods.control}
            name={AccountField.icon}
            rules={{
              required: true
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Grid container {...field} columnGap={1} rowGap={3} sx={{ marginTop: 2 }}>
                  {
                    icons.map(({ name }) => (
                      <Grid item key={name}>
                        <Account showTitle={false} selected={field.value} id={name} icon={name} size={50} onClick={handleAccountIconClick} />
                      </Grid>
                    ))
                  }
                </Grid>
                <Typography color='error.main' fontSize={12} sx={{ marginTop: 2 }}>{error ? helper.icon[error.type]?.message : ''}</Typography>
              </>
            )}
          />
        </FormProvider>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 3 }}>
        <Button variant='contained' onClick={methods.handleSubmit(handleFormSubmit)} loading={loading}>Save</Button>
      </Box>
    </Box>
  );
};

export default NewAccount;
