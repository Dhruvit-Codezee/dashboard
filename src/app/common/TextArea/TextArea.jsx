import {
  InputLabel,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import React from "react";
import {
  useController,
} from "react-hook-form";

import { TextAreaContainer } from "./TextArea.styled";

export function TextArea({
  control,
  name,
  defaultValue,
  label = "",
  rules,
  loading = false,
  required,
  disabled,
  placeholder = "",
  minRows = 3,
  error = false,
  helperText,
  ...inputFieldProps
}) {
  const {
    field: { onChange, ...restField },
  } = useController({ name, control, defaultValue, rules });

  const theme = useTheme();

  // if (loading) {
  //   return <Skeleton rows={minRows} />;
  // }

  return (
    <Stack gap="10px">
      {label && (
        <InputLabel required={required} disabled={disabled}>
          {label}
        </InputLabel>
      )}

      <TextAreaContainer
        disabled={disabled}
        placeholder={placeholder || label}
        minRows={minRows}
        error={error}
        onChange={(event) => {
          const value = event.target.value ?? null;

          onChange(value);
        }}
        {...restField}
        {...inputFieldProps}
      />

      {error && (
        <Typography
          variant="caption"
          sx={{
            color: `${theme.palette.app.color.red[900]}`,
            whiteSpace: "pre",
            textWrap: "wrap",
          }}
        >
          {helperText}
        </Typography>
      )}
    </Stack>
  );
}
