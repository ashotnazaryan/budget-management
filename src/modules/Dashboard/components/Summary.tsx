import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'core/i18n';
import { Period, Transaction } from 'shared/models';
import Balance from 'shared/components/Balance';
import CategoryTransaction from '../../components/CategoryTransaction';
import PeriodFilters from './PeriodFilters';

interface SummaryProps {
  incomes: string;
  expenses: string;
  profit: string;
  transactions: Transaction[];
  period: Period;
  onAddTransaction: () => void;
  onFilter: (period: Period) => void;
}

const Summary: React.FC<SummaryProps> = ({ incomes, expenses, profit, transactions, period, onAddTransaction, onFilter }) => {
  const { palette: { primary: { main, dark, light, contrastText } } } = useTheme();
  const { t } = useTranslation();

  const getCategoryTransactionData = (data: Transaction): Transaction => {
    return {
      ...data,
      name: data.nameKey ? t(data.nameKey) : data.name
    };
  };

  return (
    <Box
      sx={{
        backgroundColor: main,
        paddingX: 2,
        paddingBottom: 2,
        paddingTop: 4,
        borderRadius: 1
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography noWrap color={contrastText} fontSize={{ sm: 26, xs: 22 }} sx={{ textAlign: 'center', marginBottom: 4 }}>{t('DASHBOARD.SUMMARY')}</Typography>
        </Grid>
        <Grid container display='flex' justifyContent='center' sx={{ marginBottom: 2 }}>
          <PeriodFilters selectedPeriod={period} onFilter={onFilter} />
        </Grid>
        <Grid container flexWrap='nowrap' sx={{ backgroundColor: dark, borderTopLeftRadius: (theme) => theme.spacing(1), borderTopRightRadius: (theme) => theme.spacing(1) }}>
          <Grid item xs={6} display='flex' flexDirection='column' justifyContent='center' paddingY={1}>
            <Typography noWrap color={contrastText} fontSize={{ sm: 17, xs: 14 }} sx={{ textAlign: 'center' }}>{t('DASHBOARD.TOTAL_INCOME')}</Typography>
            <Typography noWrap color={contrastText} fontSize={{ sm: 17, xs: 14 }} sx={{ textAlign: 'center' }}>{incomes}</Typography>
          </Grid>
          <Divider orientation='vertical' sx={{ backgroundColor: light }} flexItem />
          <Grid item xs={6} display='flex' flexDirection='column' justifyContent='center' paddingY={1}>
            <Typography noWrap color={contrastText} fontSize={{ sm: 17, xs: 14 }} sx={{ textAlign: 'center' }}>{t('DASHBOARD.TOTAL_EXPENSES')}</Typography>
            <Typography noWrap color={contrastText} fontSize={{ sm: 17, xs: 14 }} sx={{ textAlign: 'center' }}>{expenses}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ backgroundColor: light, paddingY: 2, borderBottomLeftRadius: (theme) => theme.spacing(1), borderBottomRightRadius: (theme) => theme.spacing(1) }}>
            <Typography noWrap color={contrastText} fontSize={{ sm: 24, xs: 20 }} sx={{ textAlign: 'center' }}>{t('DASHBOARD.PROFIT')}</Typography>
            <Balance balance={profit} positiveColor={contrastText} fontSize={{ sm: 26, xs: 22 }} sx={{ textAlign: 'center' }} />
          </Box>
        </Grid>
        <Grid item display='flex' justifyContent='flex-end' xs={12} sx={{ marginY: 1 }}>
          <IconButton aria-label='New transaction' onClick={onAddTransaction}>
            <AddIcon sx={{ color: contrastText }} fontSize='large' />
          </IconButton>
        </Grid>
        <Grid container item rowGap={2}>
          {
            transactions.map((transaction) => (
              <Grid item key={transaction.categoryId} xs={12}>
                <CategoryTransaction data={getCategoryTransactionData(transaction)} />
              </Grid>
            ))
          }
        </Grid>
      </Grid>
    </Box>
  );
};

export default Summary;
