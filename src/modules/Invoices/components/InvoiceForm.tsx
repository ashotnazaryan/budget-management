import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { SelectChangeEvent } from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'core/i18n';
import { Currency, Invoice, InvoiceField } from 'shared/models';
import { invoiceHelper } from 'shared/helpers';
import { useAppSelector } from 'store';
import { CURRENCIES, POSITIVE_NUMERIC_REGEX } from 'shared/constants';
import { selectSettings } from 'store/reducers';
import FormInput from 'shared/components/FormInput';
import FormSelect from 'shared/components/FormSelect';
import CurrencyInfoItem from 'shared/components/CurrencyInfoItem';

interface InvoiceFormProps {
  onSubmit: (formData: Invoice) => void;
  onCurrencyChange: (currencyIso: Currency['iso']) => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onSubmit, onCurrencyChange }) => {
  const { t } = useTranslation();
  const helper = invoiceHelper();
  const { palette: { info: { contrastText } } } = useTheme();
  const { defaultCurrency: { iso } } = useAppSelector(selectSettings);
  const regex = POSITIVE_NUMERIC_REGEX;
  const currencies = CURRENCIES;
  const [currencyIso, setCurrencyIso] = React.useState<Currency['iso']>(iso);
  const [vatIncluded, setVatIncluded] = React.useState<boolean>(false);

  const defaultValues: Partial<Invoice> = {
    title: '',
    salary: '',
    currencyIso: iso,
    vatIncluded: false,
    sellerName: '',
    sellerAddress: '',
    sellerLocation: '',
    sellerVatID: '',
    sellerAccount: '',
    buyerName: '',
    buyerAddress: '',
    buyerLocation: '',
    buyerVatID: ''
  };

  const methods = useForm<Invoice>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues
  });

  const { setValue, handleSubmit } = methods;

  const handleCurrencyChange = (event: SelectChangeEvent<string>): void => {
    const value = event.target.value as Currency['iso'];

    setValue(InvoiceField.currencyIso, value);
    setCurrencyIso(value);
    onCurrencyChange(value);
  };

  const handleVatIncludedChange = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    setValue(InvoiceField.vatIncluded, checked);
    setVatIncluded(checked);
  };

  const handleFormSubmit = (data: Invoice): void => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container gap={3}>
          <Grid item container>
            <Paper elevation={1} sx={{ paddingX: 3, paddingTop: 2, paddingBottom: 6, width: '100%' }}>
              <Typography sx={{ marginBottom: 2 }}>{t('INVOICES.MAIN_INFO')}</Typography>
              <Grid item container gap={7}>
                <Grid item xs={12}>
                  <FormInput
                    label={t('COMMON.TITLE')}
                    name={InvoiceField.title}
                    rules={{
                      required: {
                        value: true,
                        message: t(helper.title.required!.message)
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    label={t('COMMON.SALARY')}
                    type='number'
                    name={InvoiceField.salary}
                    rules={{
                      required: {
                        value: true,
                        message: t(helper.salary.required!.message)
                      },
                      pattern: {
                        value: regex,
                        message: t(helper.salary.pattern!.message)
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormSelect
                    label={t('COMMON.CURRENCY')}
                    name={InvoiceField.currencyIso}
                    value={currencyIso || iso}
                    onChange={handleCurrencyChange}
                    rules={{
                      required: {
                        value: true,
                        message: t(helper.currencyIso.required!.message)
                      }
                    }}
                  >
                    {currencies.map(({ iso, name, nameKey, symbol }) => (
                      <MenuItem value={iso} key={iso}>
                        <CurrencyInfoItem currency={{ iso, symbol, name, nameKey }} />
                      </MenuItem>
                    ))}
                  </FormSelect>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={vatIncluded}
                        onChange={handleVatIncludedChange}
                      />}
                    label={
                      <Typography color={contrastText}>{t('INVOICES.INCLUDE_VAT')}</Typography>
                    }
                    labelPlacement='start'
                    sx={{
                      '&.MuiFormControlLabel-root': {
                        margin: 0
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item container>
            <Paper elevation={1} sx={{ paddingX: 3, paddingTop: 2, paddingBottom: 7, width: '100%' }}>
              <Typography sx={{ marginBottom: 2 }}>{t('INVOICES.SELLER_INFO')}</Typography>
              <Grid item container gap={7}>
                <Grid item xs={12}>
                  <FormInput
                    label={t('COMMON.NAME')}
                    name={InvoiceField.sellerName}
                    rules={{
                      required: {
                        value: true,
                        message: t(helper.sellerName.required!.message)
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    label={t('COMMON.ADDRESS')}
                    name={InvoiceField.sellerAddress}
                    rules={{
                      required: {
                        value: true,
                        message: t(helper.sellerAddress.required!.message)
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    label={t('COMMON.LOCATION')}
                    name={InvoiceField.sellerLocation}
                    rules={{
                      required: {
                        value: true,
                        message: t(helper.sellerLocation.required!.message)
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    label={t('COMMON.VAT_ID')}
                    name={InvoiceField.sellerVatID}
                    rules={{
                      required: {
                        value: true,
                        message: t(helper.sellerVatID.required!.message)
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    label={t('COMMON.ACCOUNT')}
                    name={InvoiceField.sellerAccount}
                    rules={{
                      required: {
                        value: true,
                        message: t(helper.sellerAccount.required!.message)
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item container>
            <Paper elevation={1} sx={{ paddingX: 3, paddingTop: 2, paddingBottom: 7, width: '100%' }}>
              <Typography sx={{ marginBottom: 2 }}>{t('INVOICES.BUYER_INFO')}</Typography>
              <Grid item container gap={7}>
                <Grid item xs={12}>
                  <FormInput
                    label={t('COMMON.NAME')}
                    name={InvoiceField.buyerName}
                    rules={{
                      required: {
                        value: true,
                        message: t(helper.buyerName.required!.message)
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    label={t('COMMON.ADDRESS')}
                    name={InvoiceField.buyerAddress}
                    rules={{
                      required: {
                        value: true,
                        message: t(helper.buyerAddress.required!.message)
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    label={t('COMMON.LOCATION')}
                    name={InvoiceField.buyerLocation}
                    rules={{
                      required: {
                        value: true,
                        message: t(helper.buyerLocation.required!.message)
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    label={t('COMMON.VAT_ID')}
                    name={InvoiceField.buyerVatID}
                    rules={{
                      required: {
                        value: true,
                        message: t(helper.buyerVatID.required!.message)
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Button aria-label='Save invoice' fullWidth type='submit' variant='contained' onClick={handleSubmit(handleFormSubmit)}>
              {t('COMMON.PREVIEW')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default InvoiceForm;
