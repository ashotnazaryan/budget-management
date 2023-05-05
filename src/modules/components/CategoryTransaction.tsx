import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { Transaction } from 'shared/models';
import Ellipsis from 'shared/components/Ellipsis';
import Icon from 'shared/components/Icon';

interface CategoryTransactionProps {
  data: Transaction;
  showPercentage?: boolean;
}

const CategoryTransaction: React.FC<CategoryTransactionProps> = ({ data, showPercentage = true }) => {
  const { name, icon, amount, percentValue = '' } = data;
  const { palette: { primary: { dark, light, contrastText } } } = useTheme();

  const getBGColor = () => {
    const percentageValue = parseInt(percentValue);

    return `linear-gradient(to right, ${dark} 0%, ${dark} calc(${percentageValue}%), ${light} calc(${percentageValue}%), ${light} 100%)`;
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: getBGColor(),
      paddingX: { sm: 2, xs: 1 },
      paddingY: { sm: 2, xs: 1 },
      borderRadius: 1,
      width: '100%',
      minHeight: 40
    }}>
      <Grid container alignItems='center' flexWrap='nowrap' columnGap={1}>
        <Grid item xs='auto' display='flex'>
          {icon && <Icon name={icon} sx={{ fontSize: 24, color: contrastText }}></Icon>}
        </Grid>
        <Grid item xs={7} display='flex'>
          <Ellipsis color={contrastText} text={name} />
        </Grid>
        <Grid item xs={2} display='flex' justifyContent='flex-end'>
          {showPercentage && <Ellipsis color={contrastText} text={percentValue} />}
        </Grid>
        <Grid item xs={3} display='flex' justifyContent='flex-end'>
          <Ellipsis color={contrastText} text={amount} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryTransaction;
