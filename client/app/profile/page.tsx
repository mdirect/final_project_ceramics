"use client";

import Link from "next/link";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useAuth } from "@/src/shared/providers/AuthProvider";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  return (
    <Stack spacing={4} alignItems="center" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack spacing={1} textAlign="center">
        <Typography
          variant="h1"
          sx={{
            textTransform: "none",
            letterSpacing: "0.01em",
            fontWeight: 500,
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: { xs: "2.4rem", md: "2.9rem" },
            color: "rgba(255,255,255,0.95)",
          }}
        >
          Profile
        </Typography>
        <Typography
          sx={{
            fontSize: "0.9rem",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Manage your account details
        </Typography>
      </Stack>

      <Box
        sx={{
          maxWidth: 520,
          width: "100%",
          borderRadius: 3,
          p: { xs: 3.5, md: 5 },
          backgroundColor: "rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.37)",
          backdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {isLoading ? (
          <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
            Loading profile...
          </Typography>
        ) : user ? (
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
                }}
              >
                Name
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.92)" }}>
                {user.name}
              </Typography>
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
                }}
              >
                Email
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.92)" }}>
                {user.email}
              </Typography>
            </Box>
          </Stack>
        ) : (
          <Stack spacing={2} alignItems="center">
            <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
              You are not signed in yet.
            </Typography>
            <Button
              component={Link}
              href="/signin"
              variant="contained"
              sx={{
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                fontSize: "0.72rem",
                py: 1.4,
                backgroundColor: "#1a1a1a",
                color: "rgba(255,255,255,0.95)",
                boxShadow: "0 14px 32px rgba(0,0,0,0.45)",
                "&:hover": { backgroundColor: "#0f0f0f" },
              }}
            >
              Sign in
            </Button>
          </Stack>
        )}
      </Box>
    </Stack>
  );
}
