import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { TypographyProps } from '@mui/material/Typography';
import { isPositiveString } from 'shared/helpers';
import Ellipsis from 'shared/components/Ellipsis';
import { Currency } from 'shared/models';

type BalanceProps = {
  balance: string;
  currencySymbol: Currency['symbol'];
  positiveColor?: string;
} & TypographyProps

const Balance: React.FC<BalanceProps> = ({ currencySymbol, balance = '0', positiveColor, ...props }) => {
  const { palette: { info: { contrastText }, error } } = useTheme();
  const positiveBalanceColor = positiveColor || contrastText;

  const getText = (): string => {
    return `${currencySymbol}${balance}`;
  };

  return (
    <Ellipsis text={getText()} color={isPositiveString(balance) ? positiveBalanceColor : error.main} fontSize={props.fontSize} sx={{ ...props.sx }} />
  );
};

Balance.defaultProps = {
  fontSize: { sm: 16, xs: 14 }
};

export default Balance;
