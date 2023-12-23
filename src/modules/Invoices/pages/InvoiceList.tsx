import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'core/i18n';
import { useAppSelector } from 'store';
import { selectInvoice } from 'store/reducers';
import { ROUTES } from 'shared/constants';
import { IconType } from 'shared/models';
import PageTitle from 'shared/components/PageTitle';
import Icon from 'shared/components/Icon';
import Button from 'shared/components/Button';
import Skeleton from 'shared/components/Skeleton';
import EmptyState from 'shared/components/EmptyState';

const InvoiceList: React.FC<{}> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { invoices, status } = useAppSelector(selectInvoice);

  const openNewInvoicePage = (): void => {
    navigate(`${ROUTES.invoices.path}/new`);
  };

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
            <Grid item key={invoice.id} xs={12}></Grid>
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
        <Button
          aria-label='New invoice'
          color='secondary'
          variant='contained'
          startIcon={<Icon name={IconType.receipt}></Icon>}
          sx={{ width: { sm: 'auto', xs: '100%' }, fontSize: 14 }}
          onClick={openNewInvoicePage}>
          {t('INVOICES.NEW_INVOICE')}
        </Button>
      </Grid>
    </Box>
  );
};

export default InvoiceList;
