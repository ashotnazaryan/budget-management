import * as React from 'react';
import { TypographyProps } from '@mui/material/Typography';
import { StyledEllipsis } from './Ellipsis.styles';

type EllipsisProps = { text: string; } & TypographyProps;

const Ellipsis: React.FC<EllipsisProps> = ({ text, ...props }) => {
  return (
    <StyledEllipsis variant='inherit' {...props}>{text}</StyledEllipsis>
  );
};

Ellipsis.defaultProps = {
  fontSize: { sm: 16, xs: 14 }
};

export default Ellipsis;
