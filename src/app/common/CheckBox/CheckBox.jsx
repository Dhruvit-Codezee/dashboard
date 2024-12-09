import Checkbox, {
} from "@mui/material/Checkbox";
import {
  useController,

} from "react-hook-form";
import { BoxStyled, CheckStyled } from "./CheckBox.styled";
import { Skeleton } from "./Skeleton";
import { InputLabel, Stack, Typography } from "@mui/material";


export function CheckBox({
  label,
  name,
  rules,
  control,
  defaultValue,
  size,
  required = false,
  loading = false,
  ...restCheckBoxProps
}) {
  const {
    field: { value, ...restField },
  } = useController({ name, control, defaultValue, rules });

  if (loading) {
    return <Skeleton />;
  }

  return (
    <>
      <Stack direction="row" alignItems="center" gap="6px">

        {label && <InputLabel >{label}</InputLabel>}
        <Checkbox
          icon={<BoxStyled size={size} />}
          checkedIcon={<CheckStyled size={size} />}
          checked={value}
          {...restField}
          {...restCheckBoxProps}

        />
      </Stack>
    </>
  );
}
