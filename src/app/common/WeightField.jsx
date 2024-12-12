import {
    InputLabel,
    TextField as MuiTextField,
    Stack,
    InputAdornment,
} from "@mui/material";
import { useController } from "react-hook-form";

export function WeightField({
    control,
    name,
    defaultValue,
    label = "",
    rules,
    loading = false,
    required,
    disabled,
    placeholder = "",
    rows,
    unit = "",
    ...inputFieldProps
}) {
    const {
        field: { onChange, value, ...restField },
    } = useController({ name, control, defaultValue, rules });
    const handleKeyPress = (event) => {
        // Prevent non-numeric input
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    };
    return (
        <Stack gap="10px">
            {label && (
                <InputLabel
                    required={required}
                    disabled={disabled}
                    sx={{
                        "& .MuiFormLabel-asterisk": { color: "red" },
                    }}
                >
                    {label}
                </InputLabel>
            )}

            <MuiTextField
                disabled={disabled}
                required={required}
                fullWidth
                placeholder={placeholder || label}
                type="text" // Use text type to allow better control
                value={value}
                onKeyPress={handleKeyPress}
                onChange={(event) => {
                    const numericValue = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                    onChange(numericValue ? parseInt(numericValue, 10) : null);
                }}
                InputProps={{
                    endAdornment: unit && (
                        <InputAdornment position="end">{unit}</InputAdornment>
                    ),
                }}
                {...restField}
                {...inputFieldProps}
            />
        </Stack>
    );
}
