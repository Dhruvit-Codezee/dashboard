import { DeleteDialog } from "@/app/common/Dialog/DeleteDialog";
import { useDeleteBotListData } from "./hooks/useDeleteBotListData";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export const DeleteBotDialog = ({
  bot,
  open,
  onDeleteSuccess,
  onClose,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useDeleteBotListData({
    botId: bot.id,
    options: {
      onSuccess: (data) => {
        onClose();
        // onDeleteSuccess();
        queryClient.invalidateQueries(['bot']);

        toast.success(data.message);
      },
      onError: (error) => toast?.error(error?.message),
    },
  });

  return (
    <DeleteDialog
      title="Are you sure you want to delete?"
      open={open}
      isDeleteLoading={isPending}
      onDelete={() => mutate()}
      onClose={() => onClose()}
    />
  );
};
