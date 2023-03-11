import styled from '@emotion/styled';
import DialogContent from '@mui/material/DialogContent';
import { theme } from 'core/theme.config';

export const StyledDialogContent = styled(DialogContent)({
  '&.MuiDialogContent-root': {
    paddingTop: theme.spacing(4),
    display: 'flex'
  }
});
