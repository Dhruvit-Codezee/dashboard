import {
  InputLabel,
  TextField as MuiTextField,
  Stack,
} from "@mui/material";
import {
  useController,
} from "react-hook-form";
// import { Skeleton } from "./FileUpload/Skeleton";

export function TextField({
  control,
  name,
  defaultValue,
  label = "",
  rules,
  type,
  loading = false,
  required,
  disabled,
  placeholder = "",
  rows,
  ...inputFieldProps
}) {
  const {
    field: { onChange, ...restField },
  } = useController({ name, control, defaultValue, rules });

  // if (loading) {
  //   return <Skeleton rows={rows} />;
  // }

  return (
    <Stack gap="10px">
      {label && (
        <InputLabel required={required} disabled={disabled} sx={{
          "& .MuiFormLabel-asterisk": { color: "red" },
        }}>
          {label}
        </InputLabel>
      )}

      <MuiTextField
        disabled={disabled}
        required={required}
        fullWidth
        placeholder={placeholder || label}
        type={type}
        onChange={(event) => {
          const value = event.target.value || null;

          if (value && type === "number") {
            onChange(Number(value));
          } else {
            onChange(value);
          }
        }}
        {...restField}
        {...inputFieldProps}
      />
    </Stack>
  );
}
