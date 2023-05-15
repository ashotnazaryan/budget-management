import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { DatePicker as MuiDatePicker, DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizedDate } from 'core/date';
import { FormControlRules } from 'shared/models';

type FormDatePickerProps = {
  name: string;
  label: string;
  rules?: FormControlRules;
} & MuiDatePickerProps<LocalizedDate>;

const FormDatePicker: React.FC<FormDatePickerProps> = ({ name, label, rules = {}, ...props }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer sx={{ paddingTop: 2, overflow: 'initial' }} components={['DatePicker']}>
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field, fieldState: { error } }) => (
            <Box position='relative'>
              <InputLabel>{label}</InputLabel>
              <MuiDatePicker
                {...field}
                {...props} />
              {errors[name] && <FormHelperText sx={{ position: 'absolute' }} error>{error?.message}</FormHelperText>}
            </Box>
          )}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default FormDatePicker;
