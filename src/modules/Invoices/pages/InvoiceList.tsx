import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/system/Box';
import { useTranslation } from 'core/i18n';
import PageTitle from 'shared/components/PageTitle';
import { IconType } from 'shared/models';
import { ROUTES } from 'shared/constants';
import Icon from 'shared/components/Icon';
import Button from 'shared/components/Button';

const InvoiceList: React.FC<{}> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const openNewInvoicePage = (): void => {
    navigate(`${ROUTES.invoices.path}/new`);
  };

  return (
    <Box flexGrow={1}>
      <PageTitle text={t('INVOICES.PAGE_TITLE')} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          aria-label='New invoice'
          color='secondary'
          variant='contained'
          startIcon={<Icon name={IconType.receipt}></Icon>}
          sx={{ width: { sm: 'auto', xs: '100%' }, fontSize: 14 }}
          onClick={openNewInvoicePage}>
          {t('INVOICES.NEW_INVOICE')}
        </Button>
      </Box>
    </Box>
  );
};

export default InvoiceList;
