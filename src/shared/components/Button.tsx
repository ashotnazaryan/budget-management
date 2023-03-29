import * as React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { theme } from 'core/theme.config';

type ButtonProps = { loading?: boolean; } & MuiButtonProps;

const Button: React.FC<ButtonProps> = ({ loading = false, ...props }) => {
  const loadingIcon = (): React.ReactNode => {
    return loading && <CircularProgress size={24} sx={{ color: theme.palette.primary.contrastText }} />;
  };

  const icon = loadingIcon();

  return (
    <MuiButton {...props} endIcon={icon}>{props.children}</MuiButton>
  );
};

export default Button;
