import * as React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'core/i18n';
import { Invoice, InvoiceField } from 'shared/models';
import { invoiceHelper } from 'shared/helpers';
import { useAppSelector } from 'store';
import { CURRENCIES, POSITIVE_NUMERIC_REGEX } from 'shared/constants';
import { selectSettings } from 'store/reducers';
import FormInput from 'shared/components/FormInput';
import FormSelect from 'shared/components/FormSelect';
import CurrencyInfoItem from 'shared/components/CurrencyInfoItem';

interface InvoiceFormProps {
  onSubmit: (formData: Invoice) => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const helper = invoiceHelper();
  const { palette: { info: { contrastText } } } = useTheme();
  const regex = POSITIVE_NUMERIC_REGEX;
  const currencies = CURRENCIES;
  const { defaultCurrency: { iso } } = useAppSelector(selectSettings);

  const defaultValues: Partial<Invoice> = {
    title: '',
    salary: '',
    currencyIso: iso,
    vatIncluded: false
  };

  const methods = useForm<Invoice>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container gap={7}>
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
              value={iso}
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
            <Controller
              name={InvoiceField.vatIncluded}
              control={methods.control}
              defaultValue={defaultValues.vatIncluded}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      name={InvoiceField.vatIncluded}
                    />
                  }
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
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button aria-label='Save invoice' fullWidth type='submit' variant='contained' onClick={methods.handleSubmit(onSubmit)}>
              {t('COMMON.PREVIEW')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default InvoiceForm;
