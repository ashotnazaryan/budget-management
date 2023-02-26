import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/system/Container';
import Divider from '@mui/material/Divider';
import StyledSummary from './Summary.styles';

interface SummaryProps {
  incomes: number;
  expenses: number;
  balance: number;
}

class Summary extends React.Component<SummaryProps> {
  render() {
    const { incomes, expenses, balance } = this.props;

    return (
      <StyledSummary>
        <Box
          sx={{
            backgroundColor: 'primary.main',
            width: 300,
            height: 200,
            padding: 2,
            borderRadius: 1
          }}
        >
          <Typography variant='h6' color='primary.contrastText' component='p' sx={{ textAlign: 'center', marginBottom: 2 }}>
            Summary
          </Typography>
          <Container sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'primary.dark', borderRadius: 1, paddingY: 2, marginBottom: 2 }}>
            <Box>
              <Typography variant='subtitle1' color='primary.contrastText' component='p' sx={{ textAlign: 'center' }}>
                Total Income
              </Typography>
              <Typography color='primary.contrastText' sx={{ textAlign: 'center' }}>{incomes}</Typography>
            </Box>
            <Divider orientation='vertical' sx={{ backgroundColor: 'primary.light' }} flexItem />
            <Box>
              <Typography variant='subtitle1' color='primary.contrastText' component='p' sx={{ textAlign: 'center' }}>
                Total Expenses
              </Typography>
              <Typography color='primary.contrastText' sx={{ textAlign: 'center' }}>{expenses}</Typography>
            </Box>
          </Container>
          <Container sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'primary.light', borderRadius: 1, paddingY: 2 }}>
            <Box sx={{ width: '100%' }}>
              <Typography variant='subtitle1' color='primary.contrastText' component='p' sx={{ textAlign: 'center' }}>
                Remaining Monthly Balance
              </Typography>
              <Typography color='primary.contrastText' sx={{ textAlign: 'center' }}>{balance}</Typography>
            </Box>
          </Container>
        </Box>
      </StyledSummary>
    );
  }
}

export default Summary;
