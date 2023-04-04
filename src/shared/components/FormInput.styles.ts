import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import { Theme } from '@mui/material/styles';

interface StyledTextFieldProps {
  theme: Theme;
}

export const StyledTextField = styled(TextField)<StyledTextFieldProps>`
  &.MuiInputBase-input {
    border-color: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.primary.main};
  },
  &.MuiOutlinedInput-root {
    &.Mui-error {
      & .MuiOutlinedInput-notchedOutline: {
        border-color: ${(props) => props.theme.palette.error.main},
      }
    }
    border-color: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.error.main};
  }
`;
