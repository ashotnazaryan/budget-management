import * as React from 'react';
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
  onSave: (data: T) => void;
}

const Dialog: React.FC<DialogProps> = ({ title, cancelButtonText = 'Cancel', actionButtonText = 'OK', onClose, onSave, children, ...props }) => {
  const { palette: { primary: { main, contrastText } } } = theme;

  const handleOnSave = (data: DialogProps['data']): void => {
    onSave(data);
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
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelButtonText}</Button>
        <Button variant='contained' onClick={handleOnSave} autoFocus>{actionButtonText}</Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
