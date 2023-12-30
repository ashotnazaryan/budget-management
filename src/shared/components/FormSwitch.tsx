import * as React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Switch, { SwitchProps } from '@mui/material/Switch';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { FormControlRules } from 'shared/models';

type FormSwitchProps = {
  name: string;
  label: string;
  rules?: FormControlRules;
  onSwitchChange?: (checked: boolean) => void;
} & SwitchProps;

const FormSwitch: React.FC<FormSwitchProps> = ({ name, label, rules = {}, onSwitchChange, ...props }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (onSwitchChange) {
      onSwitchChange(event.target.checked);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Box position='relative'>
          <FormControlLabel
            control={
              <Switch
                {...props}
                {...field}
                value={field.value}
                checked={field.value}
                onChange={(event) => {
                  field.onChange(event);
                  onChange(event);
                }}
              />
            }
            label={
              <Typography>{label}</Typography>
            }
            labelPlacement='start'
            sx={{
              '&.MuiFormControlLabel-root': {
                margin: 0
              }
            }}
          />
          {errors[name] && <FormHelperText sx={{ position: 'absolute' }} error>{error?.message}</FormHelperText>}
        </Box>
      )}
    />
  );
};

export default FormSwitch;
