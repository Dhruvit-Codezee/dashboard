import { FormControlLabel, InputLabel, RadioGroup, Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import {
  useController,
} from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Skeleton } from "./Skeleton";




export function RadioGroupField({
  name,
  rules,
  label,
  control,
  options,
  defaultValue,
  size = "small",
  color = "secondary",
  loading = false,
  ...restRadioButtonProps
}) {
  const {
    field: { value, onChange, ...restField },
  } = useController({ name, control, defaultValue, rules });

  if (loading) {
    return <Skeleton />;
  }

  return (
    <Stack gap="15px" direction="row" alignItems="center">
      {label && <InputLabel>{label}:</InputLabel>}

      <RadioGroup
        name={name}
        value={value}
        onChange={(_, event) => {
          if (event === "true") {
            onChange(true);
          } else if (event === "false") {
            onChange(false);
          } else {
            onChange(event);
          }
        }}
      >
        <Stack gap="45px" direction="row">
          {options?.map(({ label, values, disabled }) => {
            return (
              <FormControlLabel
                value={values}
                control={
                  <Radio
                    {...restField}
                    {...restRadioButtonProps}
                    color={color}
                    size={size}
                  />
                }
                disabled={disabled}
                label={label}
                key={uuidv4()}
              />
            );
          })}
        </Stack>
      </RadioGroup>
    </Stack>
  );
}
