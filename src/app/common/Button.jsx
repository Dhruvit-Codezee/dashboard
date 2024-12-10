import { CircularProgress, Button as MuiButton } from "@mui/material";

export const Button = ({
  loading = false,
  children,
  disabled = false,
  ...rest
}) => {
  return (
    <MuiButton disabled={loading || disabled} {...rest}>
      {loading ? <CircularProgress size={28} /> : children}
    </MuiButton>
  );
};
