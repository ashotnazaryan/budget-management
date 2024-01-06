import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'core/i18n';
import { useAppDispatch, useAppSelector } from 'store';
import { getInvoices, selectCurrency, selectInvoice } from 'store/reducers';
import { ROUTES } from 'shared/constants';
import { IconType, Invoice as InvoiceModel } from 'shared/models';
import PageTitle from 'shared/components/PageTitle';
import Icon from 'shared/components/Icon';
import Skeleton from 'shared/components/Skeleton';
import EmptyState from 'shared/components/EmptyState';
import Invoice from '../components/Invoice';

const InvoiceList: React.FC<{}> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { invoices, status } = useAppSelector(selectInvoice);
  const defaultCurrency = useAppSelector(selectCurrency);

  const openNewInvoicePage = (): void => {
    navigate(`${ROUTES.invoices.path}/new`);
  };

  const handleInvoiceItemClick = ({ id, name }: InvoiceModel): void => {
    navigate(`${ROUTES.invoices.path}/view/${name}`, { state: { id } });
  };

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(getInvoices());
    }
  }, [dispatch, status]);

  const renderContent = (): React.ReactElement => {
    if (status === 'loading') {
      return (
        <Grid item xs={12}>
          <Skeleton type='list' />
        </Grid>
      );
    }

    if ((status === 'failed' || status === 'succeeded') && !invoices?.length) {
      return (
        <Grid item xs={12}>
          <EmptyState text={t('INVOICES.EMPTY_TEXT')} />
        </Grid>
      );
    }

    return (
      <>
        {
          invoices.map((invoice) => (
            <Grid item key={invoice.id} xs={12}>
              <Invoice data={invoice} defaultCurrency={defaultCurrency} onClick={handleInvoiceItemClick} />
            </Grid>
          ))
        }
      </>
    );
  };

  return (
    <Box flexGrow={1}>
      <PageTitle text={t('INVOICES.PAGE_TITLE')} />
      <Grid container rowGap={2} sx={{ marginTop: 4 }}>
        {renderContent()}
        <Grid item xs={12} display='flex' justifyContent='flex-end'>
          <IconButton color='primary' onClick={openNewInvoicePage} sx={{ alignSelf: 'flex-end' }}>
            <Icon name={IconType.plus} sx={{ fontSize: 40 }}></Icon>
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InvoiceList;
