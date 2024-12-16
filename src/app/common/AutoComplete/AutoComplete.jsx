import { Autocomplete as MuiAutocomplete, TextField as MuiTextField, InputLabel, Stack } from "@mui/material";
import { useController } from "react-hook-form";
import { Skeleton } from "./Skeleton";

export function AutoComplete({
    control,
    name,
    label = "",
    rules,
    options = [],
    getOptionLabel = (option) => option.label || "",
    isOptionEqualToValue = (option, value) => option.value === value,
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

    const currentOption =
        options.find((option) => option.label === value) || null;

    if (loading) {
        return <Skeleton label={label} />;
    }

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
                getOptionLabel={getOptionLabel} 
                isOptionEqualToValue={isOptionEqualToValue} 
                value={currentOption} 
                onChange={(_, selectedOption) => {
                    
                    onChange(selectedOption ? selectedOption.label : "");
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
