import * as React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';

export type ButtonProps = { loading?: boolean; capitalize?: boolean } & MuiButtonProps;

const Button: React.FC<ButtonProps> = ({ loading = false, capitalize = true, ...props }) => {
  const { palette: { primary: { contrastText } } } = useTheme();

  const loadingIcon = (): React.ReactNode => {
    return loading && <CircularProgress size={28} sx={{ color: contrastText }} />;
  };

  const icon = loadingIcon();

  return (
    <MuiButton
      {...props}
      endIcon={icon}
      disabled={loading || props.disabled}
      sx={{
        minWidth: { sm: 120, xs: 90 },
        fontSize: 16,
        textTransform: capitalize ? 'uppercase' : 'none',
        '& .MuiButton-endIcon': {
          margin: 0
        },
        ...props.sx,
      }}
    >{!loading && props.children}</MuiButton>
  );
};

export default Button;
