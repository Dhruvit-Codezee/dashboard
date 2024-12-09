"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import CustomTextField from "../(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import toast from "react-hot-toast";
import { emailRegex } from "@/utils/regex";

const validationSchema = Yup.object({
  email: Yup.string().required("Email Address is required").matches(
    emailRegex,
    "Enter a valid email address"
  ),
  password: Yup.string().required("Password is required"),
});



export default function Login() {
  const searchParams = useSearchParams();

  const callBackUrl = searchParams.get("callbackUrl");

  const router = useRouter();

  const onSubmit = async (values) => {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });
    if (result?.error) {
      toast.error("Incorrect credentials")
    } else if (result?.ok) {
      toast.success("Login Successful")
      if (callBackUrl) {
        router.push(callBackUrl);
      } else {
        router.push("/");
      }
    }


  };

  const { touched, errors, values, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <PageContainer title="Login" description="this is Login page">
    <Box
      sx={{
        position: "relative",
        "&:before": {
          content: '""',
          background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
          position: "absolute",
          height: "100%",
          width: "100%",
          opacity: "0.3",
        },
      }}
    >
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          lg={4}
          xl={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card
            elevation={9}
            sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <Logo />
            </Box>
            <Stack>

      <Box>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="username"
          mb="5px"
        >
          Username
        </Typography>
        <CustomTextField   name='email'
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email} variant="outlined" fullWidth />
      </Box>
      <Box mt="25px">
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="password"
          mb="5px"
        >
          Password
        </Typography>
        <CustomTextField type="password"  name='password'
                            value={values.password}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password} variant="outlined" fullWidth />
      </Box>
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        my={2}
      >        
      </Stack>
    </Stack>
    <Box>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        onClick={()=>handleSubmit()}
        type="submit"
      >
        Sign In
      </Button>
    </Box>

          </Card>
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
  );
}
