import * as React from 'react';
import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { theme } from 'core/theme.config';
import { StyledDialogContent } from './Dialog.styles';

type DialogProps<T = any> = {
  cancelButtonText?: string;
  actionButtonText?: string;
  children?: React.ReactNode;
  data?: T;
  withActions?: boolean;
  onClose: () => void;
  onAction: (data: T) => void;
} & MuiDialogProps

const Dialog: React.FC<DialogProps> = ({ cancelButtonText = 'Cancel', actionButtonText = 'OK', withActions = true, onClose, onAction, children, ...props }) => {
  const { palette: { primary: { main, contrastText } } } = theme;

  const handleOnAction = (data: DialogProps['data']): void => {
    onAction(data);
  };

  return (
    <MuiDialog
      {...props}
      onClose={onClose}
    >
      <DialogTitle sx={{ backgroundColor: main, color: contrastText }}>
        {props.title}
      </DialogTitle>
      <StyledDialogContent>
        {children}
      </StyledDialogContent>
      {withActions && (
        <DialogActions>
          <Button onClick={onClose}>{cancelButtonText}</Button>
          <Button variant='contained' onClick={handleOnAction} autoFocus>{actionButtonText}</Button>
        </DialogActions>
      )}
    </MuiDialog>
  );
};

export default Dialog;
