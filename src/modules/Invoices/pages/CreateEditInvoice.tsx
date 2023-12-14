import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useTranslation } from 'core/i18n';
import { ManageMode } from 'shared/models';
import { ROUTES } from 'shared/constants';
import PageTitle from 'shared/components/PageTitle';

interface NewInvoiceProps {
  mode: ManageMode;
}

const CreateEditInvoice: React.FC<NewInvoiceProps> = ({ mode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goBack = React.useCallback(() => {
    navigate(`${ROUTES.invoices.path}`);
  }, [navigate]);

  return (
    <Box flexGrow={1}>
      <PageTitle
        withBackButton
        text={t('INVOICES.NEW_INVOICE')}
        onBackButtonClick={goBack} />
    </Box>
  );
};

export default CreateEditInvoice;
