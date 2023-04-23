import * as React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { StyledTextField } from './FormInput.styles';

type FormInputProps = {
  name: string;
  rules?: any; // TODO: fix any type
} & TextFieldProps;

const FormInput: React.FC<FormInputProps> = ({ name, rules = {}, ...props }) => {
  const theme = useTheme();

  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Box position='relative'>
          <StyledTextField
            fullWidth
            {...field}
            {...props}
            theme={theme}
            error={!!errors[name]}
          />
          {errors[name] && <FormHelperText sx={{ position: 'absolute' }} error>{error?.message}</FormHelperText>}
        </Box>
      )}
    />
  );
};

export default FormInput;
