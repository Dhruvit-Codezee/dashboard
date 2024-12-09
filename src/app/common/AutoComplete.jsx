import { Autocomplete as MuiAutocomplete, TextField as MuiTextField, InputLabel, Stack } from "@mui/material";
import { useController } from "react-hook-form";

export function AutoComplete({
    control,
    name,
    label = "",
    rules,
    options = [],
    getOptionLabel = (option) => option.label || "",
    isOptionEqualToValue = (option, value) => option.value === value, // Check based on key (value)
    required,
    disabled,
    placeholder = "",
    loading = false,
    onInputChange,
    error = false,
    helperText,
    ...autocompleteProps
}) {
    const {
        field: { value, onChange, ...restField },
    } = useController({ name, control, rules });

    // Find the matching option based on the current key (value)
    const currentOption =
        options.find((option) => option.value === value) || null;

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
            <MuiAutocomplete
                disabled={disabled}
                loading={loading}
                options={options}
                getOptionLabel={getOptionLabel} // Display the label based on the option
                isOptionEqualToValue={isOptionEqualToValue} // Compare using key (value)
                value={currentOption} // Set the current selected option based on the key (value)
                onChange={(_, selectedOption) => {
                    // Set the key (value) as the selected value
                    onChange(selectedOption ? selectedOption.value : "");
                }}
                onInputChange={onInputChange}
                renderInput={(params) => (
                    <MuiTextField
                        {...params}
                        placeholder={placeholder || label}
                        required={required}
                        error={error}
                        helperText={helperText}
                    />
                )}
                {...restField}
                {...autocompleteProps}
            />
        </Stack>
    );
};
