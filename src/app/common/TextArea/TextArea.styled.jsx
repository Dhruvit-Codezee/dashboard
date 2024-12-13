import { COLORS } from "@/constants/colors";
import { TextareaAutosize, styled } from "@mui/material";

export const TextAreaContainer = styled(
  TextareaAutosize
)(({ theme, error }) => ({
  boxSizing: "border-box",
  width: "100%",
  lineHeight: "1.5",
  padding: "8px 12px",
  fontSize: "16px",
  border: error
    ? `1px solid red}`
    : `1px solid grey`,
  borderRadius: "5px",
  cursor: "pointer",
  "&:hover": {
    borderColor: COLORS.IRON_800,
  },
  "&:focus": {
    borderColor: COLORS.BUTTERFLY_BLUE_900,
    borderWidth: "2px",
  },
  "&:focus-visible": {
    outline: 0,
  },
  "&::placeholder": {
    color: COLORS.IRON_400, // Replace with your desired placeholder color
  },
}));
