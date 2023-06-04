"use client";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { signIn } from "next-auth/react";
import { Facebook, Google, Twitter } from "grommet-icons";
import React, { useState } from "react";
import Container from "@mui/material/Container";

export default function LoginForm() {
  const router = useRouter();
  const onLoginClicked = (value) =>
    signIn(
      "credentials",
      { ...value, redirect: false },
      { remember: checked }
    ).then(({ error, status, ok, url }) => {
      if (!ok) {
        setStatus(error);
      } else {
        router.push(url);
      }
    });
  const [status, setStatus] = useState(null);
  const [checked, setChecked] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "80%", mt: "20%", mb: "20%" }}>
        <h1 className="pb-7 text-center text-3xl font-medium text-gray-800">
          Login
        </h1>
        <form
          onSubmit={handleSubmit(onLoginClicked)}
          autoComplete={checked ? "true" : "false"}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2.5,
            }}
          >
            <Controller
              name="username"
              control={control}
              rules={{
                required: { value: true, message: "This field is required" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.username}
                  helperText={errors?.username?.message}
                  fullWidth={true}
                  id="username"
                  label="Username"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Controller
              name="password"
              control={control}
              rules={{
                required: { value: true, message: "This field is required" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  fullWidth={true}
                  id="password"
                  label="Password"
                  type={"password"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    setChecked(e.target.checked);
                  }}
                />
              }
              label={
                <Typography
                  className="text-[12px] md:text-[16px]"
                  fontFamily="var(--mulish-font)"
                >
                  Keep me logged in
                </Typography>
              }
            />
            <Link
              className="text-[12px] md:text-[16px]"
              sx={{
                fontFamily: "var(--mulish-font)",
              }}
              to={"/recovery"}
              underline="none"
            >
              Forgot password?
            </Link>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              type={"submit"}
              sx={{
                width: 1,
                height: 50,
                fontSize: "1rem",
                fontWeight: "light",
                fontFamily: "var(--mulish-font)",
              }}
              className="rounded bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-800"
            >
              Login
            </Button>
          </Box>
          {status && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <div className="text-red-700">{status}</div>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="text-[12px] md:text-[16px]">
              Don&apos;t have an account?{" "}
              <Link
                className="text-[12px] md:text-[16px]"
                sx={{
                  fontFamily: "var(--mulish-font)",
                }}
                to={"/registration"}
                underline="none"
              >
                Sign up
              </Link>
            </div>
          </Box>
          <div className="flex items-center">
            <div className="h-0.5 flex-grow bg-gray-400"></div>
            <span className="flex-shrink px-4 text-xl font-light text-gray-500 md:text-2xl">
              OR
            </span>
            <div className="h-0.5 flex-grow bg-gray-400"></div>
          </div>
          <Box
            onClick={() => signIn("google")}
            className="mt-[16px] cursor-pointer rounded border border-solid border-gray-700 hover:bg-gray-700 hover:text-white"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <IconButton onClick={() => signIn("facebook")}>
              <Facebook color={"plain"} size={"large"} />
            </IconButton> */}

            <div className="flex items-center justify-center rounded px-4 py-2 text-[16px] md:text-[18px]">
              <IconButton>
                <Google color={"plain"} size={"medium"} />
              </IconButton>
              Continue with Google
            </div>

            {/* <IconButton onClick={() => signIn("twitter")}>
              <Twitter color={"plain"} size={"large"} />
            </IconButton> */}
          </Box>
        </form>
      </Box>
    </Container>
  );
}
