import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'core/i18n';
import { Currency, Invoice, InvoiceField, ManageMode } from 'shared/models';
import { invoiceHelper } from 'shared/helpers';
import { useAppSelector } from 'store';
import { CURRENCIES, POSITIVE_NUMERIC_REGEX } from 'shared/constants';
import { selectSettings } from 'store/reducers';
import FormInput from 'shared/components/FormInput';
import FormSelect from 'shared/components/FormSelect';
import CurrencyInfoItem from 'shared/components/CurrencyInfoItem';
import Button from 'shared/components/Button';
import FormSwitch from 'shared/components/FormSwitch';

interface InvoiceFormProps {
  data: Partial<Invoice>;
  loading: boolean;
  mode: ManageMode;
  onSubmit: (formData: Invoice) => void;
  onPreview: (formData: Invoice) => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ data, loading, mode, onPreview, onSubmit }) => {
  const { t } = useTranslation();
  const helper = invoiceHelper();
  const { defaultCurrency: { iso } } = useAppSelector(selectSettings);
  const regex = POSITIVE_NUMERIC_REGEX;
  const currencies = CURRENCIES;
  const defaultCurrencyIso = CURRENCIES.some((currency) => currency.iso === iso) ? iso : 'USD';
  const [vatIncluded, setVatIncluded] = React.useState<boolean>(false);
  const isViewMode = mode === ManageMode.view;
  const isCreateMode = mode === ManageMode.create;

  const defaultValues: Partial<Invoice> = {
    name: '',
    salary: '',
    currencyIso: isCreateMode ? defaultCurrencyIso : (data.currencyIso || '' as Currency['iso']),
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

  React.useEffect(() => {
    Object.keys(data).forEach((key) => {
      setValue(key as keyof Invoice, data[key as keyof Invoice]);
    });

    setVatIncluded(!!data.vatIncluded);
  }, [data, setValue, defaultCurrencyIso]);

  const handleVatIncludedChange = (checked: boolean): void => {
    setVatIncluded(checked);
    setValue(InvoiceField.vatIncluded, checked);
  };

  const handleFormPreview = (data: Invoice): void => {
    onPreview(data);
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
              <Typography sx={{ marginTop: 2, marginBottom: 4 }} fontSize={17}>{t('INVOICES.MAIN_INFO')}</Typography>
              <Grid item container gap={7}>
                <Grid item xs={12}>
                  <FormInput
                    inputProps={{ readOnly: isViewMode }}
                    label={t('COMMON.NAME')}
                    name={InvoiceField.name}
                    rules={{
                      required: {
                        value: true,
                        message: t(helper.name.required!.message)
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    inputProps={{ readOnly: isViewMode }}
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
                    inputProps={{ readOnly: isViewMode }}
                    label={t('COMMON.CURRENCY')}
                    name={InvoiceField.currencyIso}
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
                  <FormSwitch
                    name={InvoiceField.vatIncluded}
                    label={t('INVOICES.INCLUDE_VAT')}
                    checked={vatIncluded}
                    disabled={isViewMode}
                    onSwitchChange={handleVatIncludedChange}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item container>
            <Paper elevation={1} sx={{ paddingX: 3, paddingTop: 2, paddingBottom: 7, width: '100%' }}>
              <Typography sx={{ marginTop: 2, marginBottom: 4 }} fontSize={17}>{t('INVOICES.SELLER_INFO')}</Typography>
              <Grid item container gap={7}>
                <Grid item xs={12}>
                  <FormInput
                    inputProps={{ readOnly: isViewMode }}
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
                    inputProps={{ readOnly: isViewMode }}
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
                    inputProps={{ readOnly: isViewMode }}
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
                    inputProps={{ readOnly: isViewMode }}
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
                    inputProps={{ readOnly: isViewMode }}
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
              <Typography sx={{ marginTop: 2, marginBottom: 4 }} fontSize={17}>{t('INVOICES.BUYER_INFO')}</Typography>
              <Grid item container gap={7}>
                <Grid item xs={12}>
                  <FormInput
                    inputProps={{ readOnly: isViewMode }}
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
                    inputProps={{ readOnly: isViewMode }}
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
                    inputProps={{ readOnly: isViewMode }}
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
                    inputProps={{ readOnly: isViewMode }}
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
          {!isViewMode && (
            <>
              <Grid item xs={12}>
                <Button aria-label='Preview invoice' fullWidth type='submit' variant='contained' onClick={handleSubmit(handleFormPreview)}>
                  {t('COMMON.PREVIEW')}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button aria-label='Save invoice' fullWidth variant='contained' loading={loading} onClick={handleSubmit(handleFormSubmit)}>
                  {t('COMMON.SAVE')}
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </form>
    </FormProvider>
  );
};

export default InvoiceForm;
