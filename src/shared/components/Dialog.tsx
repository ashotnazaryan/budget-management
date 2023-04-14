import * as React from 'react';
import { useTranslation } from 'react-i18next';
import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useTheme } from '@mui/material/styles';
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

const Dialog: React.FC<DialogProps> = ({ cancelButtonText, actionButtonText, withActions = true, loading = false, onClose, onAction, children, ...props }) => {
  const theme = useTheme();
  const { t } = useTranslation();

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
      <StyledDialogTitle theme={theme} sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
        {props.title}
      </StyledDialogTitle>
      <StyledDialogContent theme={theme} sx={{ display: 'flex' }}>
        {children}
      </StyledDialogContent>
      {withActions && (
        <DialogActions>
          <Button onClick={onClose}>{t(cancelButtonText!)}</Button>
          <Button variant='contained' loading={loading} onClick={handleOnAction} autoFocus>{t(actionButtonText!)}</Button>
        </DialogActions>
      )}
    </MuiDialog>
  );
};

Dialog.defaultProps = {
  cancelButtonText: 'COMMON.CANCEL',
  actionButtonText: 'COMMON.OK'
};

export default Dialog;
