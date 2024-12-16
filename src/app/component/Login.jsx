"use client";

import { Grid, Box, Card, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import toast from "react-hot-toast";
import { emailRegex } from "@/utils/regex";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "../common/TextField/TextField";
import { PasswordField } from "../common/PasswordField";
import { Button } from "../common/Button";

const ValidationSchema = z.object({

  email: z.string().trim().regex(emailRegex, "Enter a valid email address").nullable().refine((value) => !!value, { message: "Username is required", }),

  password: z.string().trim().nullable().refine((value) => !!value, { message: "Password is required" }),

});

const formDefaultValues = {
  email: null,
  password: null,
};

export default function Login() {
  const searchParams = useSearchParams();

  const callBackUrl = searchParams.get("callbackUrl");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (values) => {

    setLoading(true);

    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });

    setLoading(false);

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

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    values: formDefaultValues,
    resolver: zodResolver(ValidationSchema),
    mode: "all",
  });

  return (
    <PageContainer title="Login" description="this is Login page">
      <form onSubmit={handleSubmit(onSubmit)}>
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
                    <TextField
                      name="email"
                      control={control}
                      label="Username"
                      required
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Box>
                  <Box mt="25px">
                    <PasswordField
                      name="password"
                      control={control}
                      label="Password"
                      required
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
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
                    loading={loading}
                    // onClick={() => handleSubmit()}
                    type="submit"
                  >
                    Sign In
                  </Button>
                </Box>

              </Card>
            </Grid>
          </Grid>
        </Box>
      </form>
    </PageContainer>
  );
}
