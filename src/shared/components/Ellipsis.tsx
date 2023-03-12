import * as React from 'react';
import styled from '@emotion/styled';
import Typography, { TypographyProps } from '@mui/material/Typography';

type EllipsisProps = { text: string; } & TypographyProps;

const StyledTypography = styled(Typography)({
  '&.MuiTypography-root': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

const Ellipsis: React.FC<EllipsisProps> = ({ text, ...props }) => {
  return (
    <StyledTypography variant='inherit' {...props}>{text}</StyledTypography>
  );
};

export default Ellipsis;
