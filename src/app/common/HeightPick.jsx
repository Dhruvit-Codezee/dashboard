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
        ? value.match(/^(\d+)'(\d{1,2})?"$/)?.slice(1).map(Number) || ["", ""]
        : ["", ""];

    const handleChange = (newFeet, newInches) => {
        const validatedFeet = Math.min(Math.max(Number(newFeet), 0), 8);
        const validatedInches = Math.min(Math.max(Number(newInches), 0), 11);

        const formattedValue = `${validatedFeet}'${validatedInches}"`;

        onChange(formattedValue);
    };

    const handleInputChange = (e, maxLength) => {
        const value = e.target.value.slice(0, maxLength); // Limit to maxLength characters
        return value.replace(/^0+(?=\d)/, ""); // Remove leading zeros
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
                        value={feet}
                        onChange={(e) => {
                            const formattedValue = handleInputChange(e, 2);
                            handleChange(formattedValue, inches);
                        }}
                        // onChange={(e) => handleChange(e.target.value, inches)}
                        required={required}
                        placeholder="Feet"
                        type="number"
                        inputProps={{ min: 0, max: 8 }}
                        sx={{ width: "140px" }}
                        error={error}
                        {...restField}
                        {...inputFieldProps}
                    />

                    {/* Inches Input */}
                    <MuiTextField
                        value={inches}
                        onChange={(e) => {
                            const formattedValue = handleInputChange(e, 2);
                            handleChange(feet, formattedValue);
                        }}
                        // onChange={(e) => handleChange(feet, e.target.value)}
                        required={required}
                        placeholder="Inches"
                        type="number"
                        inputProps={{ min: 0, max: 11 }}
                        sx={{ width: "140px" }}
                        error={error}
                        {...restField}
                        {...inputFieldProps}
                    />
                </Stack>
            </Stack>
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
