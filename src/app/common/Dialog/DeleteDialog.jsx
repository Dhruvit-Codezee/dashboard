import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import { Stack, Typography } from "@mui/material";
import { Button } from "../Button";
import { Dialog } from "./Dialog";

export const DeleteDialog = ({
  title,
  open,
  isDeleteLoading,
  onDelete,
  onClose,
}) => {
  return (
    <Dialog
      maxWidth="xs"
      isHideCloseIcon={true}
      isHideDividers={true}
      open={open}
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined" disabled={isDeleteLoading}>
            Cancel
          </Button>

          <Button onClick={onDelete} color="error" loading={isDeleteLoading} variant="contained">
            Delete
          </Button>
        </Stack>
      }
    >
      <Stack gap="10px" direction="row">
        <InfoTwoToneIcon color="error" sx={{ mt: "1px" }} />

        <Typography variant="subtitle1" fontWeight={700}>
          {title}
        </Typography>
      </Stack>
    </Dialog>
  );
};
