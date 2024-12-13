import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Dialog as MuiDialog,
  Stack,
  Typography,
} from "@mui/material";
import { PadBox } from "../PadBox";

export const Dialog = ({
  title,
  isHideCloseIcon = false,
  isHideDividers = false,
  children,
  onClose,
  actions,
  ...props
}) => {
  return (
    <MuiDialog {...props}  >
      <DialogTitle textAlign="center">
        <Stack direction="row" alignItems="center">
          <Typography variant="h5" fontWeight={500} flex={1}>
            {title}
          </Typography>

          {!isHideCloseIcon && (
            <IconButton
              onClick={(event) => onClose && onClose(event, "escapeKeyDown")}
              color="secondary"
            >
              <HighlightOffIcon fontSize="large" />
            </IconButton>
          )}
        </Stack>
      </DialogTitle>

      <DialogContent dividers={!isHideDividers}>
        <PadBox padding={{ padding: "10px" }}>{children}</PadBox>
      </DialogContent>

      {actions && (
        <DialogActions sx={{ py: "16px", px: "24px" }}>{actions}</DialogActions>
      )}
    </MuiDialog>
  );
};
