import { Box, Button, Stack, TextField, Typography } from "@mui/material";

export default function SignInPage() {
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
            fontStyle: "italic",
            fontSize: { xs: "2.4rem", md: "2.9rem" },
            color: "rgba(255,255,255,0.95)",
          }}
        >
          Registration
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
        <Stack spacing={3}>
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

          <Stack spacing={1.5} sx={{ pt: 1 }}>
            <Button
              variant="contained"
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
            <Typography
              sx={{
                fontSize: "0.62rem",
                color: "rgba(255,255,255,0.4)",
                textAlign: "center",
                letterSpacing: "0.04em",
              }}
            >
              By registering you agree to our privacy policy and studio rules.
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Typography
        sx={{
          fontSize: "0.65rem",
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
        }}
      >
        WSE Jewellery • Ceramic collections and projects
      </Typography>
    </Stack>
  );
}

