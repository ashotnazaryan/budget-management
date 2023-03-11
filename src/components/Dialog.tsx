import * as React from 'react';
import styled from '@emotion/styled';
import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { theme } from 'core/theme.config';

type DialogProps<T = unknown> = {
  title: string;
  cancelButtonText?: string;
  actionButtonText?: string;
  children?: React.ReactNode;
  data?: T;
  withActions?: boolean;
  onClose: () => void;
  onAction: (data: T) => void;
} & MuiDialogProps

// TODO: move to a separate file
const StyledDialogContent = styled(DialogContent)({
  '&.MuiDialogContent-root': {
    paddingTop: theme.spacing(4),
    display: 'flex'
  }
});

const Dialog: React.FC<DialogProps> = ({ open, title, cancelButtonText = 'Cancel', actionButtonText = 'OK', withActions = true, onClose, onAction, children, ...otherProps }) => {
  const { palette: { primary: { main, contrastText } } } = theme;

  const handleOnAction = (data: DialogProps['data']): void => {
    onAction(data);
  };

  return (
    <MuiDialog
      {...otherProps}
      open={open}
      onClose={onClose}
    >
      <DialogTitle sx={{ backgroundColor: main, color: contrastText }}>
        {title}
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
