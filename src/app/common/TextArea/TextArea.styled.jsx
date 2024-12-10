import { TextareaAutosize, styled } from "@mui/material";

export const TextAreaContainer = styled(
  TextareaAutosize
)<TextAreaContainerProps>(({ theme, error }) => ({
  boxSizing: "border-box",
  width: "100%",
  lineHeight: "1.5",
  padding: "8px 12px",
  fontSize: "18px",
  border: error
    ? `2px solid ${theme.palette.app.color.red[900]}`
    : `2px solid ${theme.palette.app.color.iron[800]}`,
  borderRadius: "5px",
  cursor: "pointer",
  "&:hover": {
    borderColor: theme.palette.app.color.butterflyBlue[900],
  },
  "&:focus": {
    borderColor: theme.palette.app.color.butterflyBlue[900],
    borderWidth: "2px",
  },
  "&:focus-visible": {
    outline: 0,
  },
  "&::placeholder": {
    color: theme.palette.app.color.iron[800],
  },
}));
