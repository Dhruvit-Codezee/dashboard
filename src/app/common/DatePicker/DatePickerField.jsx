import React, { useState } from 'react';
import { InputLabel, Stack, TextField as MuiTextField } from '@mui/material';
import { useController } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export function DatePickerField({
  control,
  name,
  defaultValue,
  label = '',
  rules,
  readOnly = false,
  loading = false,
  required,
  disabled,
  placeholder = '',
  error,
  helperText,
  ...inputFieldProps
}) {
  const {
    field: { onChange, value, ...restField },
  } = useController({ name, control, defaultValue, rules });

  const [open, setOpen] = useState(false);
  const handleDateChange = (newValue) => {
    // Convert the selected date to a string format (e.g., 'YYYY-MM-DD')
    const formattedValue = newValue ? newValue.format('YYYY-MM-DD HH:mm:ss') : ''; // Format as 'YYYY-MM-DD'
    onChange(formattedValue); // Pass the formatted date string to onChange
  };
  return (
    <Stack gap="10px">
      {label && (
        <InputLabel
          required={required}
          disabled={disabled}
          sx={{
            '& .MuiFormLabel-asterisk': { color: 'red' },
          }}
        >
          {label}
        </InputLabel>
      )}
      {console.log('error', error)}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          {...restField}
          value={value ? dayjs(value) : null}
          onChange={handleDateChange}
          readOnly={readOnly}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          renderInput={(params) => (
            <MuiTextField
              {...params}
              disabled={disabled}
              required={required}
              fullWidth
              placeholder={placeholder || label}
              {...inputFieldProps}
            />
          )}
          slotProps={{
            field: { clearable: true },
            textField: {
              disabled: disabled,
              onClick: () => {
                if (readOnly || disabled) {
                  setOpen(false);
                } else {
                  setOpen(true);
                }
              },
              helperText: helperText,
              error: error,
            },
          }}
        />
      </LocalizationProvider>
    </Stack>
  );
}