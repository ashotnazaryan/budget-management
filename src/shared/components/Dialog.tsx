import * as React from 'react';
import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { theme } from 'core/theme.config';
import Button from './Button';
import { StyledDialogTitle, StyledDialogContent } from './Dialog.styles';

type DialogProps<T = any> = {
  cancelButtonText?: string;
  actionButtonText?: string;
  children?: React.ReactNode;
  data?: T;
  withActions?: boolean;
  loading?: boolean;
  onClose?: () => void;
  onAction?: (data: T) => void;
} & MuiDialogProps

const Dialog: React.FC<DialogProps> = ({ cancelButtonText = 'Cancel', actionButtonText = 'OK', withActions = true, loading = false, onClose, onAction, children, ...props }) => {
  const { palette: { primary: { main, contrastText } } } = theme;

  const handleOnAction = (data: DialogProps['data']): void => {
    if (onAction) {
      onAction(data);
    }
  };

  return (
    <MuiDialog
      {...props}
      onClose={onClose}
    >
      <StyledDialogTitle sx={{ backgroundColor: main, color: contrastText }}>
        {props.title}
      </StyledDialogTitle>
      <StyledDialogContent>
        {children}
      </StyledDialogContent>
      {withActions && (
        <DialogActions>
          <Button onClick={onClose}>{cancelButtonText}</Button>
          <Button variant='contained' loading={loading} onClick={handleOnAction} autoFocus>{actionButtonText}</Button>
        </DialogActions>
      )}
    </MuiDialog>
  );
};

export default Dialog;
