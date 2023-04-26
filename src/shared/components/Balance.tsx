import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { TypographyProps } from '@mui/material/Typography';
import { isPositiveString } from 'shared/helpers';
import Ellipsis from 'shared/components/Ellipsis';

type BalanceProps = {
  balance: string;
  positiveColor?: string;
} & TypographyProps

const Balance: React.FC<BalanceProps> = ({ balance = '0', positiveColor, ...props }) => {
  const { palette: { info: { contrastText }, error } } = useTheme();
  const positiveBalanceColor = positiveColor || contrastText;

  return (
    <Ellipsis text={balance} color={isPositiveString(balance) ? positiveBalanceColor : error.main} fontSize={props.fontSize} sx={{ ...props.sx }} />
  );
};

Balance.defaultProps = {
  fontSize: 16
};

export default Balance;
