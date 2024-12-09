import { InputLabel, Stack, TextField as MuiTextField, Typography } from "@mui/material";
import { useController } from "react-hook-form";

export function HeightPick({
    control,
    name,
    defaultValue,
    label = "",
    rules,
    required = false,
    error = false,
    helperText,
    ...inputFieldProps
}) {
    const {
        field: { onChange, value, ...restField },
    } = useController({ name, control, defaultValue, rules });


    // Parse current value into feet and inches
    const [feet, inches] = value
        ? value.match(/^(\d+)'(\d{1,2})?''$/)?.slice(1).map(Number) || ["", ""]
        : ["", ""];

    const handleChange = (newFeet, newInches) => {
        const validatedFeet = Math.min(Math.max(Number(newFeet) || 0, 0), 8);
        const validatedInches = Math.min(Math.max(Number(newInches) || 0, 0), 11);

        const formattedValue = `${validatedFeet}'${validatedInches}''`;

        onChange(formattedValue);
    };

    return (
        <>
            <Stack gap="10px">
                {label && (
                    <InputLabel
                        required={required}
                        // disabled={disabled}
                        sx={{
                            "& .MuiFormLabel-asterisk": { color: "red" },
                        }}
                    >
                        {label}
                    </InputLabel>
                )}

                <Stack direction="row" gap="10px">
                    {/* Feet Input */}
                    <MuiTextField
                        value={feet || 1}
                        onChange={(e) => handleChange(e.target.value, inches)}
                        // disabled={disabled}
                        required={required}
                        placeholder="Feet"
                        type="number"
                        inputProps={{ min: 0, max: 8 }}
                        {...restField}
                        {...inputFieldProps}
                    />

                    {/* Inches Input */}
                    <MuiTextField
                        value={inches || 0}
                        onChange={(e) => handleChange(feet, e.target.value)}
                        // disabled={disabled}
                        required={required}
                        placeholder="Inches"
                        type="number"
                        inputProps={{ min: 0, max: 11 }}
                        {...restField}
                        {...inputFieldProps}
                    />
                </Stack>
            </Stack>
            {console.log(feet, inches)}
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
        </>
    );
};
