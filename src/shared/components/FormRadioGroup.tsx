import * as React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { FormControlRules, Option } from 'shared/models';

type FormRadioGroupProps = {
  name: string;
  options: Option[];
  labelColor?: string;
  rules?: FormControlRules;
  disabled?: boolean;
  readonly?: boolean;
  onRadioChange: (checkedValue: Option['value']) => void;
} & RadioGroupProps;

const FormRadioGroup: React.FC<FormRadioGroupProps> = ({ name, options, labelColor, rules = {}, disabled, readonly, onRadioChange, ...props }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    readonly && event.preventDefault();
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (readonly || disabled) {
      return;
    }

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
          <RadioGroup row {...props} {...field} value={field.value} onClick={onClick}>
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
