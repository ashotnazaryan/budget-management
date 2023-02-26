import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/system/Container';
import Divider from '@mui/material/Divider';
import { Currency } from 'shared/models';

interface SummaryProps {
  incomes: number;
  expenses: number;
  balance: number;
  currencySymbol: Currency['symbol'];
}

const Summary: React.FC<SummaryProps> = ({ incomes, expenses, balance, currencySymbol }) => {
  return (
    <Container sx={{ flex: 'auto' }} disableGutters={true}>
      <Box
        sx={{
          backgroundColor: 'primary.main',
          paddingX: 2,
          paddingTop: 2,
          paddingBottom: 4,
          borderRadius: 1
        }}
      >
        <Typography variant='h5' color='primary.contrastText' sx={{ textAlign: 'center', marginBottom: 2 }}>
          Summary
        </Typography>
        <Container sx={{ display: 'flex', backgroundColor: 'primary.dark', borderRadius: 1, paddingY: 2, marginBottom: 2 }} disableGutters={true}>
          <Box sx={{ flex: '50%' }}>
            <Typography variant='subtitle1' color='primary.contrastText' component='p' sx={{ textAlign: 'center' }}>
              Total Income
            </Typography>
            <Typography color='primary.contrastText' sx={{ textAlign: 'center' }}>{currencySymbol}{incomes}</Typography>
          </Box>
          <Divider orientation='vertical' sx={{ backgroundColor: 'primary.light' }} flexItem />
          <Box sx={{ flex: '50%' }}>
            <Typography variant='subtitle1' color='primary.contrastText' component='p' sx={{ textAlign: 'center' }}>
              Total Expenses
            </Typography>
            <Typography color='primary.contrastText' sx={{ textAlign: 'center' }}>{currencySymbol}{expenses}</Typography>
          </Box>
        </Container>
        <Container sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'primary.light', borderRadius: 1, paddingY: 2 }} disableGutters={true}>
          <Box sx={{ width: '100%' }}>
            <Typography variant='h6' color='primary.contrastText' component='p' sx={{ textAlign: 'center' }}>
              Remaining Monthly Balance
            </Typography>
            <Typography variant='h6' color={balance > 0 ? 'primary.contrastText' : 'secondary.main'} sx={{ textAlign: 'center' }}>{currencySymbol}{balance}</Typography>
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default Summary;
