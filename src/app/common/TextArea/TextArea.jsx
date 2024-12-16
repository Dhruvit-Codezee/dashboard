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
import { Skeleton } from "../TextField/Skeleton";

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

  if (loading) {
    return <Skeleton rows={minRows} />;
  }

  return (
    <Stack gap="10px">
      {label && (
        <InputLabel required={required} disabled={disabled} sx={{
          "& .MuiFormLabel-asterisk": { color: "red" },
        }}>
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
            color: `red`,
            whiteSpace: "pre",
            textWrap: "wrap",
            marginLeft: "15px",
          }}
        >
          {helperText}
        </Typography>
      )}
    </Stack>
  );
}
