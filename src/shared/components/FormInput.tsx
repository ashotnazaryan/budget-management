import * as React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField';
import { StyledTextField } from './FormInput.styles';

type FormInputProps = {
  name: string;
  rules?: any;
} & TextFieldProps;

const FormInput: React.FC<FormInputProps> = ({ name, rules = {}, ...props }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <StyledTextField
          {...field}
          {...props}
          error={!!errors[name]}
          helperText={
            errors[name] && error?.message
          }
        />
      )}
    />
  );
};

export default FormInput;