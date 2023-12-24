import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { IconType, Invoice as InvoiceModel } from 'shared/models';
import Icon from 'shared/components/Icon';

interface InvoiceProps {
  data: InvoiceModel;
  onClick?: (data: InvoiceModel) => void;
}

const Invoice: React.FC<InvoiceProps> = ({ data, onClick }) => {
  const { palette: { primary: { main, contrastText } } } = useTheme();
  const { name, amount, currencyIso } = data;

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
        <Grid item xs={6} display='flex' justifyContent='flex-start'>
          <Typography noWrap color={contrastText} sx={{ fontSize: { sm: 15, xs: 13 } }}>{name}</Typography>
        </Grid>
        <Grid item xs={3} display='flex'>
          {/* TODO: remove hardcoded currency */}
          <Typography noWrap color={contrastText} sx={{ fontSize: { sm: 15, xs: 13 } }}>{amount?.gross} PLN</Typography>
        </Grid>
        <Grid item xs={2} display='flex' justifyContent='flex-end'>
          <Typography noWrap color={contrastText} sx={{ fontSize: { sm: 15, xs: 13 } }}>{currencyIso}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Invoice;
