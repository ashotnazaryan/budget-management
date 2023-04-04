import styled from '@emotion/styled';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Theme } from '@mui/material/styles';

interface StyledDialogProps {
  theme: Theme;
}

export const StyledDialogTitle = styled(DialogTitle)<StyledDialogProps>`
  &.MuiDialogTitle-root {
    padding: ${(props) => props.theme.spacing(3)};
  }
`;

export const StyledDialogContent = styled(DialogContent)<StyledDialogProps>`
  &.MuiDialogContent-root {
    padding-top: ${(props) => props.theme.spacing(4)};
  }
`;
