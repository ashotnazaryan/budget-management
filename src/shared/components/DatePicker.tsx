import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker as MuiDatePicker, DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { DateValidationError, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { PickerChangeHandlerContext } from '@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue';

type DatePickerProps = MuiDatePickerProps<Dayjs>;

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, ...props }) => {
  const onDateChange = (value: Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>) => {
    if (onChange) {
      onChange(dayjs(value), context);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer sx={{ paddingTop: 2 }} components={['DatePicker']}>
        <MuiDatePicker {...props} value={dayjs(value)} onChange={onDateChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePicker;
