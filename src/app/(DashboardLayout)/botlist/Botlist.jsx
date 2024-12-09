'use client'

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataTable } from '@/app/common/DataTable';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DragAndDropUpload from '@/app/common/DragAndDropUpload';
import { useState, memo } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, Grid, InputLabel, Stack } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import { useGetBot } from '@/app/hooks/useGetBot';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckBox } from '@/app/common/CheckBox/CheckBox';
import { RadioGroupField } from '@/app/common/RadioGroupField/RadioGroupField';
import { DatePickerField } from '@/app/common/DatePicker/DatePickerField';
import { TextField } from '@/app/common/TextField';
import ImageUploadField from '@/app/common/ImageUploadField';
import { AutoComplete } from '@/app/common/AutoComplete';
import { HeightPick } from '@/app/common/HeightPick';


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
        <IconButton color="error" onClick={() => console.log('Delete', params.id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton color="secondary" onClick={() => console.log("Edit", params.id)}>
          <AddCircleIcon />
        </IconButton>
      </div>
    )
  },
];

const breastSizeOptions = [
  { label: "Small", value: 'small' },
  { label: "Medium", value: 'Medium' },
  { label: "Large", value: 'large' },
  { label: "Normal", value: 'normal' },
];

const buttSizeOptions = [
  { label: "Small", value: 'small' },
  { label: "Medium", value: 'medium' },
  { label: "Large", value: 'large' },
  { label: "Extra large", value: 'extra_large' },
];

const genderOptions = [
  { label: "Male", value: 'male' },
  { label: "Female", value: 'female' },
  { label: "Anime Boy", value: 'anim_boy' },
  { label: "Anime Girl", value: 'anime_girl' },
];

const bodySizeOptions = [
  { label: "Thin", value: 'thin' },
  { label: "Slim", value: 'slim' },
  { label: "Athletic", value: 'athletic' },
  { label: "Muscular", value: 'muscular' },
  { label: "Curvy", value: 'curvy' },
  { label: "Plus size", value: 'plus_size' },
];

const validationSchema = z.object({
  // photos: z.string().nullable().refine((value) => !!value, {
  //   message: "Profile is required",
  // }),
  name: z.string().nullable().refine((value) => !!value, {
    message: "Name is required",
  }),

  date_of_birth: z
    .string()
    .nullable()
    .refine((value) => !!value, {
      message: "Date of Birth is required",
    }),

  age: z.number().nullable().refine((value) => !!value, {
    message: "Age is required",
  }),

  description: z.string().nullable().refine((value) => !!value, {
    message: "Description is required",
  }),

  gender: z.string().nullable().refine((value) => !!value, {
    message: "Gender is required",
  }),

  height: z.string().nullable().refine((value) => !!value, {
    message: "Height is required",
  }),

  weight: z.number().nullable().refine((value) => !!value, {
    message: "Weight is required",
  }),

  interest: z.string().nullable().refine((value) => !!value, {
    message: "Interest is required",
  }),

  hobbies: z.string().nullable().refine((value) => !!value, {
    message: "Hobbies is required",
  }),

  family_members: z.number().nullable().refine((value) => !!value, {
    message: "Family Members is required",
  }),

});

const defaultValues = {
  name: null,
  age: null,
  height: null,
  weight: null,
  gender: null,
  date_of_birth: null,
  interest: null,
  hobbies: null,
  breast_size: null,
  butt_size: null,
  body_size: null,
  description: null,
  family_members: null,
  photos: null,
  bg_photo: null,
  is_premium: false,
  is_nsfw: false,
  new_bot: false,
  web_platform: false,
  ios_platform: false,
  android_platform: false,
  country_flag: null,
  country_name: null,

};

const Botlist = () => {
  const [open, setOpen] = useState(false);

  const [id, setId] = useState("");

  const { data: botListData, isPending: isPendingBotListData } = useGetBot();



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    // const { name, value } = e.target;
    // setNewData((prevData) => ({
    //     ...prevData,
    //     [name]: value,
    // }));
  };

  const handleAddRow = () => {
    // const newRow = {
    //     id: rows.length + 1, // Generate a new ID
    //     ...newData,
    // };
    // setRows((prevRows) => [...prevRows, newRow]); // Update rows
    // setOpen(false); // Close dialog after adding
    // setNewData({ firstName: '', lastName: '', age: '', fullName: '' }); // Clear form
  };
  const {
    watch,
    control,
    formState: { errors, dirtyFields },
    handleSubmit,
    setError,
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
    mode: "all",
  });

  const photos = watch("photos");
  const bg_photo = watch("bg_photo");

  const onSubmit = async (data) => {
    setId("dffd")
    const formData = new FormData();

    for (let key in data) {
      formData.append(key, data[key]);
    }
    formData.append("photos", new Blob([photos], { type: "image/jpeg" }), "profile.jpg");
    if (bg_photo) {
      formData.append("bg_photo", new Blob([bg_photo], { type: "image/jpeg" }), "background.jpg");

    }
    const response = await fetch("http://192.168.29.31:8080/api/avtars-info/", {
      method: "POST",
      headers: {
        'Authorization': 'token bc464b4c3fc8ca10f15a127ac5463b881224ef74',
      },
      body: formData,
    });

  }

  // const onMainSubmit = async (data) => {
  //   console.log('first')
  // }

  return (
    <>
      {/* <PageContainer title="Botlist" description="this is Botlist"> */}
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add New Data
        </Button>
      </Box>

      <DataTable rows={botListData} columns={columns} />

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

          {id ? <Grid item xs={4}>
            <DragAndDropUpload />
          </Grid> : <Grid container spacing={2}>

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
                    if (!value || !/^(\d+)'(\d{1,2})?''$/.test(value)) {
                      return "Height must be in the format '5'11''";
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
              <TextField
                name="weight"
                type="number"
                control={control}
                label="Weight"
                required
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
              <TextField
                name="interest"
                control={control}
                label="Interest"
                required
                error={!!errors.interest}
                helperText={errors.interest?.message}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                name="hobbies"
                control={control}
                label="Hobbies"
                required
                error={!!errors.hobbies}
                helperText={errors.hobbies?.message}
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

            <Grid item xs={4} >
              <TextField
                name="description"
                control={control}
                label="Description"
                required
                error={!!errors.description}
                helperText={errors.description?.message}
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
              marginLeft={5}
            >
              <Grid item xs={2}>
                <CheckBox
                  name="is_premium"
                  label="Premium:"
                  control={control}
                  size="small"
                />
              </Grid>

              <Grid item xs={2}>
                <CheckBox
                  name="is_nsfw"
                  label="NSFW:"
                  control={control}
                  size="small"
                />
              </Grid>

              <Grid item xs={2}>
                <CheckBox
                  name="new_bot"
                  label="New Bot:"
                  control={control}
                  size="small"
                />
              </Grid>

              <Grid item xs={2}>
                <CheckBox
                  name="web_platform"
                  label="Web Platform:"
                  control={control}
                  size="small"
                />
              </Grid>

              <Grid item xs={2}>
                <CheckBox
                  name="ios_platform"
                  label="IOS Platform:"
                  control={control}
                  size="small"
                />
              </Grid>

              <Grid item xs={2}>
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



          </Grid>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>

          {id ? <Button variant="contained" color="primary">
            Submit
          </Button> : <Button variant="contained" onClick={handleSubmit(onSubmit)} color="primary">
            Add
          </Button>}
        </DialogActions>
      </Dialog >
      {/* </PageContainer> */}
    </>
  );
};
export default Botlist
