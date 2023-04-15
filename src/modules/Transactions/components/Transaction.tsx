import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { CategoryType, Transaction as TransactionModel } from 'shared/models';
import { getCurrencySymbolByIsoCode } from 'shared/helpers';
import Icon from 'shared/components/Icon';
import Ellipsis from 'shared/components/Ellipsis';

interface TransactionProps {
  data: TransactionModel;
  onClick?: (data: TransactionModel) => void;
}

const Transaction: React.FC<TransactionProps> = ({ data, onClick }) => {
  const { palette: { primary: { main, contrastText }, error } } = useTheme();
  const { name, nameKey, icon, accountName, accountIcon, createdAt, amount, currencyIso, type } = data;
  const symbol = getCurrencySymbolByIsoCode(currencyIso);
  const { t } = useTranslation();

  const onTransactionClick = (): void => {
    if (onClick) {
      onClick(data);
    }
  };

  return (
    <Paper elevation={1} sx={{ paddingX: 2, backgroundColor: main }} onClick={onTransactionClick}>
      <Grid container columnSpacing={2} alignItems='center' sx={{ minHeight: 30, cursor: 'pointer' }}>
        <Grid item xs={1} display='flex'>
          {icon && <Icon name={icon} sx={{ color: contrastText, fontSize: { sm: 22, xs: 18 } }}></Icon>}
        </Grid>
        <Grid item xs={3}>
          <Ellipsis text={nameKey ? t(nameKey) : name} color={contrastText} />
        </Grid>
        <Grid item xs={2} display='flex' justifyContent='flex-end'>
          <Ellipsis text={`${symbol}${amount}`} color={type === CategoryType.expense ? error.main : contrastText} />
        </Grid>
        <Grid item xs={2} display='flex' justifyContent='flex-end'>
          <Ellipsis text={accountName} color={contrastText} />
        </Grid>
        <Grid item xs={1} display='flex'>
          {accountIcon && <Icon name={accountIcon} color='primary' sx={{ fontSize: { sm: 22, xs: 18 }, color: contrastText }}></Icon>}
        </Grid>
        <Grid item xs={3} display='flex' justifyContent='flex-end'>
          <Ellipsis text={createdAt} color={contrastText} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Transaction;
