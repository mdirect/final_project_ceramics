"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { userApi } from "@/src/entities/user/api";
import { apiFetch } from "@/src/shared/api/http";
import { useAuth } from "@/src/shared/providers/AuthProvider";

export default function SignUpPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);

  const handleChange =
    (field: keyof typeof formValues) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setToast(null);

    const name = formValues.name.trim();
    const email = formValues.email.trim();
    const { password, repeatPassword } = formValues;

    if (!name || !email || !password || !repeatPassword) {
      setToast({ message: "Fill in all fields to continue.", severity: "error" });
      return;
    }

    if (password !== repeatPassword) {
      setToast({ message: "Passwords do not match.", severity: "error" });
      return;
    }

    setIsSubmitting(true);

    try {
      await apiFetch(userApi.signup, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      await refreshUser();
      setToast({
        message: "Account created. Redirecting to shop...",
        severity: "success",
      });
      setFormValues({ name: "", email: "", password: "", repeatPassword: "" });
      setTimeout(() => {
        router.push("/shop");
      }, 400);
    } catch (error) {
      setToast({
        message:
          error instanceof Error ? error.message : "Registration failed.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Stack spacing={5} alignItems="center" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack spacing={1} textAlign="center">
        <Typography
          variant="h1"
          sx={{
            textTransform: "none",
            letterSpacing: "0.01em",
            fontWeight: 500,
            fontFamily: "'Playfair Display', serif",
            fontSize: { xs: "2.4rem", md: "2.9rem" },
            color: "rgba(255,255,255,0.95)",
          }}
        >
          Sign up
        </Typography>
        <Typography
          sx={{
            fontSize: "0.9rem",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Create an account to save your collection
        </Typography>
      </Stack>

      <Box
        sx={{
          maxWidth: 500,
          width: "100%",
          borderRadius: 3,
          p: { xs: 3.5, md: 5 },
          backgroundColor: "rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.37)",
          backdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Stack spacing={3} component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Box>
              <Typography
                sx={{
                  fontSize: "0.62rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.24em",
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 600,
                  mb: 0.75,
                  ml: 0.5,
                }}
              >
                Full Name
              </Typography>
              <TextField
                placeholder="Elena Vance"
                variant="outlined"
                fullWidth
                value={formValues.name}
                onChange={handleChange("name")}
                autoComplete="name"
                InputProps={{ sx: { borderRadius: 2 } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: 2,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.12)",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.22)",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "rgba(255,255,255,0.92)",
                  },
                  "& .MuiOutlinedInput-input::placeholder": {
                    color: "rgba(255,255,255,0.25)",
                  },
                }}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "0.62rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.24em",
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 600,
                  mb: 0.75,
                  ml: 0.5,
                }}
              >
                Email
              </Typography>
              <TextField
                placeholder="elena@wintersparrow.com"
                type="email"
                variant="outlined"
                fullWidth
                value={formValues.email}
                onChange={handleChange("email")}
                autoComplete="email"
                InputProps={{ sx: { borderRadius: 2 } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: 2,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.12)",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.22)",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "rgba(255,255,255,0.92)",
                  },
                  "& .MuiOutlinedInput-input::placeholder": {
                    color: "rgba(255,255,255,0.25)",
                  },
                }}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "0.62rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.24em",
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 600,
                  mb: 0.75,
                  ml: 0.5,
                }}
              >
                Password
              </Typography>
              <TextField
                placeholder="••••••••"
                type="password"
                variant="outlined"
                fullWidth
                value={formValues.password}
                onChange={handleChange("password")}
                autoComplete="new-password"
                InputProps={{ sx: { borderRadius: 2 } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: 2,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.12)",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.22)",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "rgba(255,255,255,0.92)",
                  },
                  "& .MuiOutlinedInput-input::placeholder": {
                    color: "rgba(255,255,255,0.25)",
                  },
                }}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "0.62rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.24em",
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 600,
                  mb: 0.75,
                  ml: 0.5,
                }}
              >
                Repeat Password
              </Typography>
              <TextField
                placeholder="••••••••"
                type="password"
                variant="outlined"
                fullWidth
                value={formValues.repeatPassword}
                onChange={handleChange("repeatPassword")}
                autoComplete="new-password"
                InputProps={{ sx: { borderRadius: 2 } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: 2,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.12)",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.22)",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "rgba(255,255,255,0.92)",
                  },
                  "& .MuiOutlinedInput-input::placeholder": {
                    color: "rgba(255,255,255,0.25)",
                  },
                }}
              />
            </Box>
          </Stack>

          <Stack spacing={1.5} sx={{ pt: 1, pb: 0.5 }}>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              sx={{
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                fontSize: "0.7rem",
                py: 1.6,
                backgroundColor: "#1a1a1a",
                color: "rgba(255,255,255,0.95)",
                boxShadow: "0 14px 32px rgba(0,0,0,0.45)",
                "&:hover": { backgroundColor: "#0f0f0f" },
              }}
            >
              Create Account
            </Button>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "0.06em",
                }}
              >
                Already have an account?
              </Typography>
              <Button
                component={Link}
                href="/signin"
                variant="text"
                sx={{
                  textTransform: "none",
                  letterSpacing: "0.08em",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.92)",
                  minWidth: "auto",
                  px: 0.5,
                  textDecoration: "underline",
                  textDecorationColor: "rgba(255,255,255,0.5)",
                  textUnderlineOffset: "0.2em",
                  "&:hover": {
                    textDecorationColor: "rgba(255,255,255,0.85)",
                    backgroundColor: "transparent",
                  },
                }}
              >
                Sign in
              </Button>
            </Stack>
            <Typography
              sx={{
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.72)",
                textAlign: "center",
                letterSpacing: "0.06em",
              }}
            >
              By registering you agree to our privacy policy and studio rules.
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={3500}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast(null)}
          severity={toast?.severity ?? "success"}
          variant="filled"
          sx={{
            width: "100%",
            backgroundColor:
              toast?.severity === "success" ? "#1f2b22" : "#3a1f23",
            color: "rgba(255,255,255,0.92)",
          }}
        >
          {toast?.message ?? ""}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
