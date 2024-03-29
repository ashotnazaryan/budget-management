import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'core/i18n';
import { IconType, Invoice as InvoiceModel } from 'shared/models';
import { MONTHS } from 'shared/constants';
import Icon from 'shared/components/Icon';

interface InvoiceProps {
  data: InvoiceModel;
  onClick?: (data: InvoiceModel) => void;
}

const Invoice: React.FC<InvoiceProps> = ({ data, onClick }) => {
  const { palette: { primary: { main, contrastText } } } = useTheme();
  const { t } = useTranslation();
  const { name, amount, month, buyerName } = data;
  const monthName = MONTHS.find(({ index }) => index === Number(month))?.nameKey || '';

  const onInvoiceClick = (): void => {
    if (onClick) {
      onClick(data);
    }
  };

  return (
    <Paper elevation={1} sx={{ paddingX: 2, backgroundColor: main }}>
      <Grid container display='flex' alignItems='center' justifyContent='space-between' flexGrow={1} columnSpacing={2}
        sx={{
          borderRadius: 1,
          minHeight: 40,
          cursor: 'pointer'
        }}
        onClick={onInvoiceClick}>
        <Grid item xs={1} display='flex'>
          <Icon name={IconType.receipt} sx={{ fontSize: { sm: 22, xs: 18 }, color: contrastText }}></Icon>
        </Grid>
        <Grid item xs={3} display='flex' justifyContent='flex-start'>
          <Typography noWrap color={contrastText} sx={{ fontSize: { sm: 15, xs: 13 } }}>{name}</Typography>
        </Grid>
        <Grid item xs={2} display='flex' justifyContent='flex-start'>
          <Typography noWrap color={contrastText} sx={{ fontSize: { sm: 15, xs: 13 } }}>{t(monthName)}</Typography>
        </Grid>
        <Grid item xs={3} display='flex' justifyContent='flex-start'>
          <Typography noWrap color={contrastText} sx={{ fontSize: { sm: 15, xs: 13 } }}>{buyerName}</Typography>
        </Grid>
        <Grid item xs={3} display='flex' justifyContent='flex-end'>
          <Typography noWrap color={contrastText} sx={{ fontSize: { sm: 15, xs: 13 } }}>{amount?.gross}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Invoice;
