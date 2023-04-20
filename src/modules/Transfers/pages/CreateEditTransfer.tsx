import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'store';
import { createTransfer, getAccounts, selectAccount, selectAccountStatus, selectTransfer } from 'store/reducers';
import { POSITIVE_NUMERIC_REGEX, ROUTES } from 'shared/constants';
import { Account, Currency, TransferDTO, TransferField } from 'shared/models';
import { transferHelper, getCurrencySymbolByIsoCode, isPositiveString } from 'shared/helpers';
import PageTitle from 'shared/components/PageTitle';
import Button from 'shared/components/Button';
import FormSelect from 'shared/components/FormSelect';
import Ellipsis from 'shared/components/Ellipsis';
import FormInput from 'shared/components/FormInput';
import DatePicker from 'shared/components/DatePicker';

interface CreateEditTransferProps {
  mode: 'create' | 'edit';
}

const CreateEditTransfer: React.FC<CreateEditTransferProps> = ({ mode }) => {
  const regex = POSITIVE_NUMERIC_REGEX;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectTransfer);
  const { accounts } = useAppSelector(selectAccount);
  const accountStatus = useAppSelector(selectAccountStatus);
  const loading = status === 'loading';
  const helper = transferHelper();
  const { t } = useTranslation();
  const { palette: { info: { contrastText }, error: { main } } } = useTheme();
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const isEditMode = mode === 'edit';

  const defaultValues: Partial<TransferDTO> = {
    fromAccount: '',
    toAccount: '',
    amount: '' as unknown as number,
    createdAt: new Date()
  };

  const methods = useForm<TransferDTO>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues
  });

  const { control, handleSubmit, setValue, watch } = methods;
  const watchFromAccount = watch(TransferField.fromAccount);
  const watchToAccount = watch(TransferField.toAccount);

  const handleFromAccountChange = (event: SelectChangeEvent<Account['id']>) => {
    setValue(TransferField.fromAccount, event.target.value, { shouldValidate: true });
  };

  const handleToAccountChange = (event: SelectChangeEvent<Account['id']>) => {
    setValue(TransferField.toAccount, event.target.value, { shouldValidate: true });
  };

  const handleDatePickerChange = (value: Dayjs | null): void => {
    setValue(TransferField.createdAt, value!.toDate(), { shouldValidate: true });
  };

  const handleFormSubmit = (data: TransferDTO): void => {
    const mappedData: TransferDTO = {
      ...data,
      amount: Number(data.amount)
    };

    dispatch(createTransfer(mappedData));
    setFormSubmitted(true);
  };

  const getTitle = (): string => {
    return isEditMode ? t('ACCOUNTS.EDIT_TRANSFER') : t('ACCOUNTS.NEW_TRANSFER');
  };

  // TODO: move to account.hrlpers
  const getAccountValue = (accountId: Account['id']): string => {
    const { name, nameKey } = accounts.find(({ id }) => id === accountId) as Account;

    return nameKey ? t(nameKey) : name;
  };

  // TODO: move to account.hrlpers
  const getAccountBalanceText = (balance: Account['balance'], iso: Currency['iso']): string => {
    const symbol = getCurrencySymbolByIsoCode(iso);

    return `${symbol}${balance}`;
  };

  const goBack = React.useCallback(() => {
    navigate(`${ROUTES.accounts.path}`);
  }, [navigate]);

  React.useEffect(() => {
    if (accountStatus === 'idle') {
      dispatch(getAccounts());
    }
  }, [dispatch, accountStatus]);

  React.useEffect(() => {
    if (status === 'succeeded' && formSubmitted) {
      goBack();
      dispatch(getAccounts());
    }
  }, [dispatch, goBack, status, formSubmitted]);

  return (
    <Box component='form' display='flex' flexDirection='column' flexGrow={1} onSubmit={handleSubmit(handleFormSubmit)}>
      <PageTitle withBackButton text={getTitle()} onBackButtonClick={goBack} />
      <Box flexGrow={1}>
        <FormProvider {...methods}>
          <Grid container rowGap={6} columnSpacing={2}>
            <Grid item sm={6} xs={12}>
              {/* TODO: move this component to shared */}
              <FormSelect
                label={t('ACCOUNTS.FROM_ACCOUNT')}
                name={TransferField.fromAccount}
                value={watchFromAccount}
                onChange={handleFromAccountChange}
                rules={{
                  required: {
                    value: true,
                    message: t(helper.fromAccount.required!.message)
                  }
                }}
                renderValue={(value) => (
                  <Ellipsis text={getAccountValue(value)} />
                )}
              >
                {accounts.map(({ id, name, nameKey, balance, currencyIso }) => (
                  <MenuItem value={id} key={id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Ellipsis text={nameKey ? t(nameKey) : name} />
                    <Typography color={isPositiveString(balance) ? contrastText : main}>{getAccountBalanceText(balance, currencyIso)}</Typography>
                  </MenuItem>
                ))}
              </FormSelect>
            </Grid>
            <Grid item sm={6} xs={12}>
              {/* TODO: move this component to shared */}
              <FormSelect
                label={t('ACCOUNTS.TO_ACCOUNT')}
                name={TransferField.toAccount}
                value={watchToAccount}
                onChange={handleToAccountChange}
                rules={{
                  required: {
                    value: true,
                    message: t(helper.toAccount.required!.message)
                  }
                }}
                renderValue={(value) => (
                  <Ellipsis text={getAccountValue(value)} />
                )}
              >
                {accounts.map(({ id, name, nameKey, balance, currencyIso }) => (
                  <MenuItem value={id} key={id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Ellipsis text={nameKey ? t(nameKey) : name} />
                    <Typography color={isPositiveString(balance) ? contrastText : main}>{getAccountBalanceText(balance, currencyIso)}</Typography>
                  </MenuItem>
                ))}
              </FormSelect>
            </Grid>
            <Grid item xs={12}>
              <FormInput
                label={t('COMMON.AMOUNT')}
                type='number'
                name={TransferField.amount}
                rules={{
                  required: {
                    value: true,
                    message: t(helper.amount.required!.message)
                  },
                  pattern: {
                    value: regex,
                    message: t(helper.amount.pattern!.message)
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name={TransferField.createdAt}
                render={({ field }) => (
                  <DatePicker label={t('COMMON.DATE')} value={dayjs(field.value)} onChange={handleDatePickerChange} sx={{ width: '100%' }} />
                )}
              />
            </Grid>
          </Grid>
        </FormProvider>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginY: 3 }}>
        <Button type='submit' variant='contained' loading={loading}
          sx={{ width: { sm: 'auto', xs: '100%' } }}
          onClick={handleSubmit(handleFormSubmit)}>
          {t('COMMON.SAVE')}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateEditTransfer;
