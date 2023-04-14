import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import { Currency, Transaction } from 'shared/models';
import { isPositiveString } from 'shared/helpers';
import CategoryTransaction from '../../components/CategoryTransaction';

interface SummaryProps {
  incomes: string;
  expenses: string;
  balance: string;
  currencySymbol: Currency['symbol'];
  transactions: Transaction[];
  addTransaction: () => void;
}

const Summary: React.FC<SummaryProps> = ({ incomes, expenses, balance, currencySymbol, transactions, addTransaction }) => {
  const { palette: { primary: { main, dark, light, contrastText }, error } } = useTheme();
  const { t } = useTranslation();

  const onAddTransaction = (): void => {
    addTransaction();
  };

  return (
    <Box
      sx={{
        backgroundColor: main,
        paddingX: 2,
        paddingY: 4,
        borderRadius: 1
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography color={contrastText} fontSize={{ sm: 26, xs: 22 }} sx={{ textAlign: 'center', marginBottom: 4 }}>
            {t('DASHBOARD.SUMMARY')}
          </Typography>
        </Grid>
        <Grid container flexWrap='nowrap' sx={{ backgroundColor: dark, borderTopLeftRadius: (theme) => theme.spacing(1), borderTopRightRadius: (theme) => theme.spacing(1) }}>
          <Grid item xs={6} display='flex' flexDirection='column' justifyContent='center' paddingY={1}>
            <Typography color={contrastText} fontSize={{ sm: 17, xs: 14 }} sx={{ textAlign: 'center' }}>
              {t('DASHBOARD.TOTAL_INCOME')}
            </Typography>
            <Typography color={contrastText} fontSize={{ sm: 17, xs: 14 }} sx={{ textAlign: 'center' }}>{currencySymbol}{incomes}</Typography>
          </Grid>
          <Divider orientation='vertical' sx={{ backgroundColor: light }} flexItem />
          <Grid item xs={6} display='flex' flexDirection='column' justifyContent='center' paddingY={1}>
            <Typography color={contrastText} fontSize={{ sm: 17, xs: 14 }} sx={{ textAlign: 'center' }}>
              {t('DASHBOARD.TOTAL_EXPENSES')}
            </Typography>
            <Typography color={contrastText} fontSize={{ sm: 17, xs: 14 }} sx={{ textAlign: 'center' }}>{currencySymbol}{expenses}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ backgroundColor: light, paddingY: 2, borderBottomLeftRadius: (theme) => theme.spacing(1), borderBottomRightRadius: (theme) => theme.spacing(1) }}>
            <Typography color={contrastText} fontSize={{ sm: 24, xs: 20 }} sx={{ textAlign: 'center' }}>
              {t('DASHBOARD.REMAINING_BALANCE')}
            </Typography>
            <Typography fontSize={{ sm: 26, xs: 22 }} color={isPositiveString(balance) ? contrastText : error.main} sx={{ textAlign: 'center' }}>{currencySymbol}{balance}</Typography>
          </Box>
        </Grid>
        <Grid item display='flex' justifyContent='flex-end' xs={12} sx={{ marginTop: 1 }}>
          <IconButton onClick={onAddTransaction}>
            <AddIcon sx={{ color: contrastText }} fontSize='large' />
          </IconButton>
        </Grid>
        {
          transactions.map(({ categoryId, name, amount, icon, percentValue }) => (
            <Grid item xs={12} key={categoryId}>
              <CategoryTransaction name={name} amount={amount} currency={currencySymbol} value={percentValue} icon={icon} />
            </Grid>
          ))
        }
      </Grid>
    </Box>
  );
};

export default Summary;
