import styled from '@emotion/styled';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { theme } from 'core/theme.config';

export const StyledDialogTitle = styled(DialogTitle)({
  '&.MuiDialogTitle-root': {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
  }
});

export const StyledDialogContent = styled(DialogContent)({
  '&.MuiDialogContent-root': {
    paddingTop: theme.spacing(4),
    display: 'flex'
  }
});