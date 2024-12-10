'use client'

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataTable } from '@/app/common/DataTable';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DragAndDropUpload from '@/app/common/DragAndDropUpload';
import { useState, memo, useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Divider, Grid, InputLabel, Stack } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import { useGetBot } from '@/app/hooks/useGetBot';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckBox } from '@/app/common/CheckBox/CheckBox';
import { RadioGroupField } from '@/app/common/RadioGroupField/RadioGroupField';
import { DatePickerField } from '@/app/common/DatePicker/DatePickerField';
import { TextField } from '@/app/common/TextField';
import { WeightField } from '@/app/common/WeightField';
import ImageUploadField from '@/app/common/ImageUploadField';
import { AutoComplete } from '@/app/common/AutoComplete';
import { HeightPick } from '@/app/common/HeightPick';
import { useAddBotListData } from './useAddBotListData';
import { useAddBotImages } from './useAddBotImages';
import { Button } from '@/app/common/Button';
import { useDeleteBotListData } from './useDeleteBotListData';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { TextArea } from '@/app/common/TextArea/TextArea';
import { filterChangedFormFields } from "@/utils/helper";



const breastSizeOptions = [
  { label: "small", value: 'small' },
  { label: "medium", value: 'Medium' },
  { label: "large", value: 'large' },
  { label: "normal", value: 'normal' },
];

const buttSizeOptions = [
  { label: "small", value: 'small' },
  { label: "medium", value: 'medium' },
  { label: "large", value: 'large' },
  { label: "extra large", value: 'extra_large' },
];

const genderOptions = [
  { label: "male", value: 'male' },
  { label: "female", value: 'female' },
  { label: "anime boy", value: 'anim_boy' },
  { label: "anime girl", value: 'anime_girl' },
];

const bodySizeOptions = [
  { label: "thin", value: 'thin' },
  { label: "slim", value: 'slim' },
  { label: "athletic", value: 'athletic' },
  { label: "muscular", value: 'muscular' },
  { label: "curvy", value: 'curvy' },
  { label: "plus size", value: 'plus_size' },
];

const validationSchema = z.object({

  photos: z.any().refine((value) => !!value, {
    message: "Profile is required",
  }),

  images: z.array(z.any()).refine((value) => value.length > 0, {
    message: "Images is required",
  }),

  name: z.string().refine((value) => !!value, {
    message: "Name is required",
  }),

  date_of_birth: z
    .string()
    .refine((value) => !!value, {
      message: "Date of Birth is required",
    }),

  age: z.number().nullable().refine((value) => !!value, {
    message: "Age is required",
  }),

  description: z.string().refine((value) => !!value, {
    message: "Description is required",
  }),

  gender: z.string().refine((value) => !!value, {
    message: "Gender is required",
  }),

  height: z.string().refine((value) => !!value, {
    message: "Height is required",
  }),

  weight: z.number().nullable().refine((value) => !!value, {
    message: "Weight is required",
  }),

  interest: z.string().refine((value) => !!value, {
    message: "Interest is required",
  }),

  hobbies: z.string().refine((value) => !!value, {
    message: "Hobbies is required",
  }),

  family_members: z.number().nullable().refine((value) => !!value, {
    message: "Family Members is required",
  }),

});

const defaultValues = {
  name: '',
  age: null,
  height: '',
  weight: null,
  gender: '',
  date_of_birth: '',
  interest: '',
  hobbies: '',
  breast_size: '',
  butt_size: '',
  body_size: '',
  description: '',
  family_members: null,
  photos: '',
  bg_photo: '',
  is_premium: false,
  is_nsfw: false,
  new_bot: false,
  web_platform: false,
  ios_platform: false,
  android_platform: false,
  country_flag: '',
  country_name: '',
  images: [],
};

export function Botlist() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);


  const [botId, setBotId] = useState('');

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1, headerClassName: 'custom-header' },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      headerClassName: 'custom-header',
    },
    {
      field: 'height',
      headerName: 'Height',
      flex: 1,
      headerClassName: 'custom-header',
    },
    {
      field: 'weight',
      headerName: 'Weight',
      flex: 1,
      headerClassName: 'custom-header',
    },
    {
      field: 'gender',
      headerName: 'Gender',
      flex: 1,
      headerClassName: 'custom-header',
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      flex: 1,
      headerClassName: 'custom-header',
    },
    {
      field: 'interest',
      headerName: 'Interest',
      flex: 1,
      headerClassName: 'custom-header',
    },
    {
      field: 'hobbies',
      headerName: 'Hobbies',
      flex: 1,
      headerClassName: 'custom-header',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      headerClassName: 'table-header',
      renderCell: (params) => (
        <div>
          <IconButton color="primary" onClick={() => console.log('Edit', params.id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => { setBotId(params.id); handleClickDeleteOpen(); }}>
            <DeleteIcon />
          </IconButton>
          {/* <IconButton color="secondary" onClick={() => console.log("Edit", params.id)}>
            <AddCircleIcon />
          </IconButton> */}
        </div >
      )
    },
  ];


  const { data: botListData, isPending: isPendingBotListData } = useGetBot();



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickDeleteOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const {
    watch,
    control,
    formState: { errors, dirtyFields },
    handleSubmit,
    getValues,
    setError,
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
    mode: "all",
  });

  const images = watch("images");

  const { mutate: mutateAddBotImage, isPending: isLoading } = useAddBotImages({
    options: {
      onSuccess: (data) => {
        toast.success(data?.message);
        setOpen(false);
        reset();
        setId('');
        queryClient.invalidateQueries(['bot']);
      },
      // onError: (error) => toast.error(error),
    },
  });

  const onMainSubmit = (id) => {
    const formData = new FormData();

    formData.append("avtarinformation", id);
    if (images) {
      images.forEach((image, index) => {
        formData.append("images", image);
      });
    }
    mutateAddBotImage(formData);
  }

  const { mutate, isPending } = useAddBotListData({
    options: {
      onSuccess: (data) => {

        onMainSubmit(data?.data.id);
        // toast.success(data.message);
      },
      // onError: (error) => toast.error(error),
    },
  });

  const { mutate: mutateDeleteBotListData, isPending: isDeleteLoading } = useDeleteBotListData({
    botId: botId,
    options: {
      onSuccess: (data) => {
        toast.success(data.message);
        setOpenDelete(false)
        queryClient.invalidateQueries(['bot']);
      },
      // onError: (error) => toast.error(error),
    },
  });


  const onSubmit = useCallback(() => {

    const formValues = getValues();
    const formData = new FormData();

    for (let key in formValues) {
      if (key === 'images') {
        continue;
      }
      formData.append(key, formValues[key]);
    }

    mutate(formData)

  }, []);

  const handleDelete = useCallback(() => {
    mutateDeleteBotListData();
  }, []);

  return (
    <>
      {/* <PageContainer title="Botlist" description="this is Botlist"> */}
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add New Data
        </Button>
      </Box>

      <DataTable rows={botListData} columns={columns} isLoading={isPendingBotListData} />

      <Dialog open={open} onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          handleClose();
        }
      }} sx={{
        '& .MuiDialog-paper': {
          height: '100%',
          maxWidth: "1500px",
          width: "1500px"
        },
      }}
        disableEscapeKeyDown
      >
        <DialogTitle>Add New Data</DialogTitle>
        <DialogContent>

          <Grid container spacing={1} sx={{ height: '100%' }}>

            <Grid item xs={6}>
              <Grid container spacing={2}>

                <Grid item xs={4}>
                  <TextField
                    name="name"
                    control={control}
                    label="Name"
                    required
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    name="age"
                    type="number"
                    control={control}
                    label="Age"
                    required
                    error={!!errors.age}
                    helperText={errors.age?.message}
                  />
                </Grid>
                <Grid item xs={4}>

                  <HeightPick
                    name="height"
                    control={control}
                    label="Height"
                    rules={{
                      validate: (value) => {
                        if (!value || !/^(\d+)'(\d{1,2})?"$/.test(value)) {
                          return `Height must be in the format '5'11"`;
                        }
                        return true;
                      },
                    }}
                    required
                    error={!!errors.height}
                    helperText={errors.height?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <WeightField
                    name="weight"
                    control={control}
                    label="Weight"
                    required
                    unit="lbs"
                    error={!!errors.weight}
                    helperText={errors.weight?.message}
                  />
                </Grid>

                {/* <Grid item xs={5} marginTop={4}>
  <RadioGroupField
    name="gender"
    label="Gender"
    control={control}
    options={[
      {
        values: 'male',
        label: "Male",
        disabled: false,
      },
      {
        values: 'female',
        label: "Female",
        disabled: false,
      },
      {
        values: 'anim_boy',
        label: "Anime Boy",
        disabled: false,
      },
      {
        values: 'anime_girl',
        label: "Anime Girl",
        disabled: false,
      },
    ]}
  />
</Grid> */}

                <Grid item xs={4}>
                  <AutoComplete
                    control={control}
                    name="gender"
                    label="Gender"
                    options={genderOptions}
                    required
                    error={!!errors.gender}
                    helperText={errors.gender?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <DatePickerField
                    name="date_of_birth"
                    control={control}
                    label="Date of Birth"
                    required
                    error={!!errors.date_of_birth}
                    helperText={errors.date_of_birth?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextArea
                    name="interest"
                    control={control}
                    label="Interest"
                    required
                    error={!!errors.interest}
                    helperText={errors.interest?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextArea
                    name="hobbies"
                    control={control}
                    label="Hobbies"
                    required
                    error={!!errors.hobbies}
                    helperText={errors.hobbies?.message}
                  />
                </Grid>
                <Grid item xs={4} >

                  <TextArea
                    name="description"
                    control={control}
                    label="Description"
                    required
                    error={!!errors.description}
                    helperText={
                      errors.description?.message
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <AutoComplete
                    control={control}
                    name="breast_size"
                    label="Breast Size"
                    options={breastSizeOptions}
                    defaultValue="bre"
                  // required
                  // error={!!errors.breast_size}
                  // helperText={errors.breast_size?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <AutoComplete
                    control={control}
                    name="butt_size"
                    label="Butt Size"
                    options={buttSizeOptions}
                    defaultValue={null}
                  // required
                  // error={!!errors.butt_size}
                  // helperText={errors.butt_size?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <AutoComplete
                    control={control}
                    name="body_size"
                    label="Body Size"
                    options={bodySizeOptions}
                    defaultValue={null}
                  // required
                  // error={!!errors.body_size}
                  // helperText={errors.body_size?.message}
                  />
                </Grid>



                <Grid item xs={4}>
                  <TextField
                    name="family_members"
                    control={control}
                    type="number"
                    label="Family Members"
                    required
                    error={!!errors.family_members}
                    helperText={errors.family_members?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    name="country_name"
                    control={control}
                    label="Country Name"
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    name="country_flag"
                    control={control}
                    label="Country Flag"
                  />
                </Grid>


                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  marginTop={2}
                  marginLeft={1}
                  marginBottom={2}
                >
                  <Grid item xs={4}>
                    <CheckBox
                      name="is_premium"
                      label="Premium:"
                      control={control}
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <CheckBox
                      name="is_nsfw"
                      label="NSFW:"
                      control={control}
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <CheckBox
                      name="new_bot"
                      label="New Bot:"
                      control={control}
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <CheckBox
                      name="web_platform"
                      label="Web Platform:"
                      control={control}
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <CheckBox
                      name="ios_platform"
                      label="IOS Platform:"
                      control={control}
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <CheckBox
                      name="android_platform"
                      label="Android Platform:"
                      control={control}
                      size="small"
                    />
                  </Grid>

                </Grid>
                <Grid item xs={4}>
                  <ImageUploadField
                    control={control}
                    name="photos"
                    label="Profile Photo"
                    placeholder="Upload Profile Photo"
                    required
                    error={!!errors.photos}
                    helperText={errors.photos?.message}
                  // error={!photos}
                  // helperText="Profile is required"
                  />
                </Grid>

                <Grid item xs={4}>
                  <ImageUploadField
                    control={control}
                    name="bg_photo"
                    label="Background photo"
                    placeholder="Upload Background Photo"
                  // required
                  // error={!!errors.bg_photo}
                  // helperText={errors.bg_photo?.message}
                  />
                </Grid>



              </Grid>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Divider orientation="vertical" flexItem sx={{
                borderRightWidth: 1,   // Makes the divider more visible
                borderColor: 'black',  // Sets the divider color to black
                height: '100%',
                borderStyle: 'dashed'
              }} />
            </Grid>
            <Grid item xs={5} >
              <DragAndDropUpload
                name="images"
                control={control}
                error={!!errors.images}
                helperText={errors.images?.message}
              />

            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleClose(); reset(); }} disabled={isPending || isLoading} color="secondary">
            Cancel
          </Button>
          <Button loading={isPending || isLoading} variant="contained" onClick={handleSubmit(onSubmit)} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog >
      <Dialog open={openDelete} onClose={handleClose}
      >
        <DialogContent>
          Are you sure you want to delete?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="secondary">
            Cancel
          </Button>
          <Button loading={isDeleteLoading} variant="contained" onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog >
      {/* </PageContainer> */}
    </>
  );
};
