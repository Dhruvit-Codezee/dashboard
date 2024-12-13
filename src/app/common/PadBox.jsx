import { Box } from "@mui/material";

export const PadBox = ({
  children,
  padding,
}) => {
  return (
    <Box
      sx={{
        ...padding,
        height: "inherit",
        boxSizing: "border-box",
        width: "100%",
      }}
      id="pad-box"
    >
      {children}
    </Box>
  );
};
