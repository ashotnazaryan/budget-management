import * as React from 'react';
import styled from '@emotion/styled';
import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { theme } from 'core/theme.config';

interface DialogProps<T = unknown> extends MuiDialogProps {
  title: string;
  cancelButtonText?: string;
  actionButtonText?: string;
  children?: React.ReactNode;
  data?: T;
  onClose: () => void;
  onAction: (data: T) => void;
}

const StyledDialogContent = styled(DialogContent)({
  '&.MuiDialogContent-root': {
    paddingTop: theme.spacing(4)
  }
});

const Dialog: React.FC<DialogProps> = ({ title, cancelButtonText = 'Cancel', actionButtonText = 'OK', onClose, onAction, children, ...props }) => {
  const { palette: { primary: { main, contrastText } } } = theme;

  const handleOnAction = (data: DialogProps['data']): void => {
    onAction(data);
  };

  return (
    <MuiDialog
      {...props}
      open={props.open}
      onClose={onClose}
    >
      <DialogTitle sx={{ backgroundColor: main, color: contrastText }}>
        {title}
      </DialogTitle>
      <StyledDialogContent>
        {children}
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelButtonText}</Button>
        <Button variant='contained' onClick={handleOnAction} autoFocus>{actionButtonText}</Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
