import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Grid } from "@mui/material";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckBox } from '@/app/common/CheckBox/CheckBox';
import { DatePickerField } from '@/app/common/DatePicker/DatePickerField';
import { TextField } from '@/app/common/TextField';
import { WeightField } from '@/app/common/WeightField';
import { AutoComplete } from '@/app/common/AutoComplete';
import { HeightPick } from '@/app/common/HeightPick';
import { filterChangedFormFields } from "@/utils/helper";
import { TextArea } from '@/app/common/TextArea/TextArea';
import { bodySizeOptions, breastSizeOptions, buttSizeOptions, genderOptions } from "@/utils/option";
import {DragAndDropUpload} from "@/app/common/DragAndDropUpload";
import { ImageUpload } from "@/app/common/ImageUpload";

const ValidationSchema = z.object({

  photos: z.any().refine((value) => !!value, {
    message: "Profile is required",
  }),
  // images: z.array(z.any()),

  images: z.array(z.any()).optional(),

  name: z.string().trim().nullable().refine((value) => !!value, {
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

  description: z.string().trim().nullable().refine((value) => !!value, {
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

  interest: z.string().trim().nullable().refine((value) => !!value, {
    message: "Interest is required",
  }),

  hobbies: z.string().trim().nullable().refine((value) => !!value, {
    message: "Hobbies is required",
  }),

  family_members: z.number().nullable().refine((value) => !!value, {
    message: "Family Members is required",
  }),

  country_name: z.string().trim().nullable(),

  country_flag: z.string().trim().nullable(),

});

const formDefaultValues = {
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
  images: [],
  is_active: false,
};

// const updatedSchema = validationSchema.superRefine(
//   (data, ctx) => {
//     if (!botEditId && !data.images) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["images"],
//         message: "Images is required",
//       });
//     }
//   }
// );

export const BotForm = forwardRef(
  (
    {
      defaultValues = formDefaultValues,
      loading = false,
    },
    ref
  ) => {
    const {
      watch,
      control,
      clearErrors,
      setError,
      formState: { errors, dirtyFields },
      handleSubmit,
      getValues,
      reset,
    } = useForm({
      values: defaultValues,
      resolver: zodResolver(ValidationSchema),
      mode: "all",
    });

    const images = watch('images');

    useImperativeHandle(ref, () => ({
      submitForm(onSubmit) {
        handleSubmit((formValues) => {
          if (!defaultValues.id && !images.length) {
            setError('images', { message: "Images are required" })
          } else if (defaultValues.images) {
            clearErrors("images")
            const allFields = getValues();

            const filterFormValues = filterChangedFormFields(
              allFields,
              dirtyFields
            );
            const updatedFormValues = defaultValues.id ? filterFormValues : allFields;
            onSubmit(updatedFormValues);
          }

        })();
      },
      setError,
    }));

    // const errorMessages = (messageKey?: string) => {
    //   return messageKey && t(messageKey);
    // };

    useMemo(() => {
      if (!defaultValues.id && !images.length) {
        setError('images', { message: "Images are required" })
      } else if (defaultValues.images) {
        clearErrors("images")
      }
    }, [Object.keys(errors).length], watch)

    return (
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

              <Grid item xs={4}>
                <CheckBox
                  name="is_active"
                  label="Active:"
                  control={control}
                  size="small"
                />
              </Grid>

            </Grid>
            <Grid item xs={4}>
              <ImageUpload
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
              <ImageUpload
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
          }}
          />

        </Grid>

        <Grid item xs={5} >

          <DragAndDropUpload
            name="images"
            control={control}
            error={!!errors.images}
            helperText={errors.images?.message}
            disabled={defaultValues.id}

          />

        </Grid>

      </Grid>
    );
  }
);

BotForm.displayName = "BotForm";
