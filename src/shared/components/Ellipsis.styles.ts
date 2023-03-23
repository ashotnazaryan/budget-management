import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';

export const StyledEllipsis = styled(Typography)({
  '&.MuiTypography-root': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});
