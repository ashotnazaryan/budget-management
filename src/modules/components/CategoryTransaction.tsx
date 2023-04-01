import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { theme } from 'core/theme.config';
import { Currency, Transaction } from 'shared/models';
import Ellipsis from 'shared/components/Ellipsis';
import Icon from 'shared/components/Icon';

interface CategoryTransactionProps {
  name: Transaction['name'];
  amount: Transaction['amount'];
  currency: Currency['symbol'];
  icon: Transaction['icon'];
  showPercentage?: boolean;
  value?: Transaction['percentValue'];
}

const CategoryTransaction: React.FC<CategoryTransactionProps> = ({ name, amount, currency, icon, showPercentage = true, value = '' }) => {
  const { primary: { dark, light, contrastText } } = theme.palette;

  const getBGColor = () => {
    const percentageValue = parseInt(value);

    return `linear-gradient(to right, ${dark} 0%, ${dark} calc(${percentageValue}%), ${light} calc(${percentageValue}%), ${light} 100%)`;
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: getBGColor(),
      paddingX: 4,
      paddingY: 2,
      marginY: 1,
      borderRadius: 1,
      width: '100%',
      minHeight: 40
    }}>
      <Grid container alignItems='center'>
        <Grid item sm={1} xs={1} display='flex'>
          {icon && <Icon name={icon} sx={{ fontSize: 24, color: contrastText }}></Icon>}
        </Grid>
        <Grid item sm={7} xs={5} display='flex'>
          <Ellipsis color='primary.contrastText' text={name} />
        </Grid>
        <Grid item sm={2} xs={3} display='flex' justifyContent='flex-end'>
          {showPercentage && <Ellipsis color='primary.contrastText' text={value} />}
        </Grid>
        <Grid item sm={2} xs={3} display='flex' justifyContent='flex-end'>
          <Ellipsis color='primary.contrastText' text={`${currency}${amount}`} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryTransaction;
