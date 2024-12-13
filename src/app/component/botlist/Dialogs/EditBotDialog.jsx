import { Stack } from "@mui/material";
import { useMemo, useRef } from "react";
import { BotForm } from "./BotForm";
import { useEditBotListData } from "./hooks/useEditBotListData";
import toast from "react-hot-toast";
import { Dialog } from "@/app/common/Dialog/Dialog";
import { Button } from "@/app/common/Button";
import { useGetBotListData } from "./hooks/useGetBotListData";

export const EditBotDialog = ({
  botId,
  open,
  onEditSuccess,
  onClose,
}) => {
  const formRef = useRef(null);

  const { data: botData, isPending: isPendingLatestBot } =
    useGetBotListData({
      botId,
      open
    });

  const { mutate, isPending } = useEditBotListData({
    botId,
    options: {
      onSuccess: (data) => {
        onClose();
        onEditSuccess();

        toast.success(data.message);
      },
      onError: (error) => toast.error(error?.message),
    },
  });

  const onEditBot = () => {
    formRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  const defaultValues = useMemo(() => {
    if (botData) {
      const botFormFieldValues = {
        id: botData?.id || null,
        name: botData?.name || null,
        age: botData?.age || null,
        height: botData?.height || null,
        weight: Number(botData?.weight) || null,
        gender: botData?.gender || null,
        date_of_birth: botData?.date_of_birth || null,
        interest: botData?.interest || null,
        hobbies: botData?.hobbies || null,
        breast_size: botData?.breast_size || null,
        butt_size: botData?.butt_size || null,
        body_size: botData?.body_size || null,
        description: botData?.description || null,
        family_members: Number(botData?.family_members) || null,
        photos: botData?.profile_photo || null,
        bg_photo: botData?.bg_photo || null,
        is_premium: botData?.is_premium || false,
        is_nsfw: botData?.is_nsfw || false,
        new_bot: botData?.new_bot || false,
        web_platform: botData?.web_platform || false,
        ios_platform: botData?.ios_platform || false,
        android_platform: botData?.android_platform || false,
        country_flag: botData?.country_flag || null,
        country_name: botData?.country_name || null,
        is_active: botData?.is_active || null,
        images: [],

      };

      return botFormFieldValues;
    }
  }, [botData]);

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      title="Edit Bot"
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: '1500px',
          width: '1500px',
        },
      }}
      actions={
        <Stack direction="row" gap="5px">
          <Button onClick={onClose} variant="outlined" disabled={isPending}>
            Cancel
          </Button>

          <Button onClick={onEditBot} loading={isPending} variant="contained">
            Edit
          </Button>
        </Stack>
      }
    >
      <BotForm
        ref={formRef}
        defaultValues={defaultValues}
        loading={isPendingLatestBot}
      />
    </Dialog>
  );
};
