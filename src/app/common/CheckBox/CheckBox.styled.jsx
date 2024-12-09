import { Check } from "@mui/icons-material";
import { Box, styled } from "@mui/material";

export const BoxStyled = styled(Box)(({
  theme,
  size,
}) => {

  const checkBoxSize =
    size === "small"
      ? {
          width: "14px",
          height: "14px",
        }
      : {
          width: "20px",
          height: "20px",
        };

  const style = {
    ...checkBoxSize,
    borderRadius: "4px",
    border: `2px solid ${'#212121'}`,
    "input:hover ~ &": {
      borderColor: "#1E88E5",
    },
    "input:disabled ~ &": {
      borderColor: '#424242',
    },
  };

  return style;
});

export const CheckStyled = styled(Check)(({
  theme,
  size,
}) => {

  const checkBoxSize =
    size === "small"
      ? {
          width: "14px",
          height: "14px",
        }
      : {
          width: "20px",
          height: "20px",
        };

  const style = {
    ...checkBoxSize,
    border: `2px solid ${"#1E88E5"}`,
    borderRadius: "4px",
    color: '#000000',
    // backgroundColor: "#1E88E5",
    "input:disabled ~ &": {
      borderColor: '#424242',
      backgroundColor: '#424242',
    },
  };

  return style;
});
