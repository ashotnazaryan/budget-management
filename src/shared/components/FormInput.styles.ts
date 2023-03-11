import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import { theme } from 'core/theme.config';

export const StyledTextField = styled(TextField)({
  '&.MuiInputBase-input': {
    borderColor: theme.palette.primary.main,
  },
  '&.MuiOutlinedInput-root': {
    '&.Mui-error': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.error.main,
      },
    }
  },
});
