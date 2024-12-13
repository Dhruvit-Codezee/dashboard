import { useState } from "react";

export function useDialogActions() {
  const [openedDialog, setOpenedDialog] = useState();

  const onDialogOpen = (dialogTypes) =>
    setOpenedDialog(dialogTypes);

  const onDialogClose = () => setOpenedDialog(undefined);

  return {
    onDialogClose,
    onDialogOpen,
    openedDialog,
  };
}
