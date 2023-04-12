import * as React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';

type ButtonProps = { loading?: boolean; } & MuiButtonProps;

const Button: React.FC<ButtonProps> = ({ loading = false, ...props }) => {
  const { palette: { primary: { contrastText } } } = useTheme();

  const loadingIcon = (): React.ReactNode => {
    return loading && <CircularProgress size={24} sx={{ color: contrastText }} />;
  };

  const icon = loadingIcon();

  return (
    <MuiButton {...props} endIcon={icon} disabled={loading} sx={{ minWidth: 120, width: { sm: 'auto', xs: '100%' } }}>{!loading && props.children}</MuiButton>
  );
};

export default Button;
