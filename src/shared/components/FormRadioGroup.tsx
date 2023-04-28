import * as React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

export interface RadioOption {
  label: string;
  value: string;
}

type FormRadioGroupProps = {
  name: string;
  options: RadioOption[];
  labelColor?: string;
  rules?: any;
  disabled?: boolean;
  onRadioChange: (checkedValue: RadioOption['value']) => void;
} & RadioGroupProps;

const FormRadioGroup: React.FC<FormRadioGroupProps> = ({ name, options, labelColor, rules = {}, disabled, onRadioChange, ...props }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (onRadioChange) {
      const value = event.target.value;

      onRadioChange(value);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Box position='relative'>
          <RadioGroup row {...props} {...field} value={field.value}>
            {options.map(({ label, value }) => (
              <FormControlLabel key={value} value={value}
                label={
                  <Typography color={labelColor}>{label}</Typography>
                }
                control={
                  <Radio
                    disabled={disabled}
                    checked={field.value === value}
                    onChange={onChange}
                    value={value}
                  />
                }
              />
            ))}
          </RadioGroup>
          {errors[name] && <FormHelperText sx={{ position: 'absolute' }} error>{error?.message}</FormHelperText>}
        </Box>
      )}
    />
  );
};

export default FormRadioGroup;
