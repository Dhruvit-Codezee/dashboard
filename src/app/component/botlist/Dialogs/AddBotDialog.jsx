import { Stack } from "@mui/material";
import { isFunction } from "lodash";
import { useRef, useState } from "react";
import { BotForm } from "./BotForm";
import { useAddBotListData } from "./hooks/useAddBotListData";
import { Dialog } from "@/app/common/Dialog/Dialog";
import toast from "react-hot-toast";
import { Button } from "@/app/common/Button";
import { useAddBotImages } from "./hooks/useAddBotImages";


export const AddBotDialog = ({
  open,
  onClose,
  onAddSuccess,
}) => {
  const formRef = useRef(null);

  const [img, setImg] = useState([])

  const { mutate: mutateAddBotImage, isPending: isLoading } = useAddBotImages({
    options: {
      onSuccess: (data) => {
        onClose();
        if (isFunction(onAddSuccess)) {
          onAddSuccess();
        }
        toast.success(data?.message);
      },
      onError: (error) => toast.error(error?.message),
    },
  });

  const onMainSubmit = (id) => {

    const formData = new FormData();

    formData.append("avtarinformation", id);

    if (img) {

      img.forEach((image, index) => {
        formData.append("images", image);
      });

    }

    mutateAddBotImage(formData);

  };

  const { mutate, isPending } = useAddBotListData({
    options: {
      onSuccess: (data) => {


        onMainSubmit(data?.data.id)
        // toast.success(data.message);
      },
      onError: (error) => toast.error(error?.message),
    },
  });

  const onCreateBot = () => {
    formRef.current?.submitForm((formValues) => {
      const { images, ...restValues } = formValues;

      setImg(images)

      const formData = new FormData();


      for (let key in restValues) {
        // if (key === 'is_active') {
        //   if (botEditId) {
        //     payload.append('is_active', payload[key])
        //   } else {
        //     continue;
        //   }
        // }
        formData.append(key, restValues[key] || '');
      }

      mutate(restValues);
    });
  };

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      title="Add Bot"
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

          <Button onClick={onCreateBot} loading={isPending || isLoading} variant="contained">
            Submit
          </Button>
        </Stack>
      }

    >
      <BotForm ref={formRef} />
    </Dialog>
  );
};
