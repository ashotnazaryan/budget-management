import * as React from 'react';
import { useFormContext, Controller, ControllerRenderProps, ControllerFieldState } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { FormControlRules } from 'shared/models';

type FormIconProps = {
  name: string;
  label: string;
  render: ({ field, fieldState }: { field: ControllerRenderProps, fieldState: ControllerFieldState }) => React.ReactElement;
  rules?: FormControlRules;
};

const FormIcon: React.FC<FormIconProps> = ({ name, label, rules = {}, render }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <Box position='relative'>
          <InputLabel sx={{ marginBottom: 2 }}>{label}</InputLabel>
          {render({ field, fieldState })}
          {errors[name] && <FormHelperText sx={{ position: 'absolute' }} error>{fieldState.error?.message}</FormHelperText>}
        </Box>
      )}
    />
  );
};

export default FormIcon;
