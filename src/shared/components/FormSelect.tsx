import * as React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select, { SelectProps } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';

export interface SelectOption {
  label: string;
  value: string;
}

type FormSelectProps = {
  name: string;
  label: string;
  rules?: any;
} & SelectProps<SelectOption['value']>;

const FormSelect: React.FC<FormSelectProps> = ({ name, label, rules = {}, children, ...props }) => {
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
          <InputLabel>{label}</InputLabel>
          <Select
            fullWidth
            variant='outlined'
            error={!!errors[name]}
            {...field}
            {...props}>
            {children}
          </Select>
          {errors[name] && <FormHelperText sx={{ position: 'absolute' }} error>{error?.message}</FormHelperText>}
        </Box>
      )}
    />
  );
};

export default FormSelect;
