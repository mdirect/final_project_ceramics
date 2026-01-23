import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";

export default function SignInPage() {
  return (
    <Stack spacing={5} alignItems="center">
      <Stack spacing={1} textAlign="center">
        <Typography
          variant="h1"
          sx={{
            textTransform: "none",
            letterSpacing: "0.02em",
            fontWeight: 500,
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          Registration
        </Typography>
        <Typography
          sx={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontStyle: "italic",
            color: "rgba(0,0,0,0.6)",
          }}
        >
          Create an account to save your collection
        </Typography>
      </Stack>

      <Box
        sx={{
          maxWidth: 620,
          width: "100%",
          borderRadius: 4,
          p: { xs: 3, md: 4.5 },
          backgroundColor: "rgba(250, 249, 247, 0.92)",
          boxShadow: "0 22px 50px rgba(0,0,0,0.14)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.7)",
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={2}>
            <TextField
              label="Full name"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255,255,255,0.96)",
                  borderRadius: 2,
                },
                "& .MuiInputLabel-root": { color: "rgba(0,0,0,0.6)" },
                "& .MuiOutlinedInput-input": { color: "rgba(0,0,0,0.85)" },
              }}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255,255,255,0.96)",
                  borderRadius: 2,
                },
                "& .MuiInputLabel-root": { color: "rgba(0,0,0,0.6)" },
                "& .MuiOutlinedInput-input": { color: "rgba(0,0,0,0.85)" },
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255,255,255,0.96)",
                  borderRadius: 2,
                },
                "& .MuiInputLabel-root": { color: "rgba(0,0,0,0.6)" },
                "& .MuiOutlinedInput-input": { color: "rgba(0,0,0,0.85)" },
              }}
            />
            <TextField
              label="Repeat password"
              type="password"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255,255,255,0.96)",
                  borderRadius: 2,
                },
                "& .MuiInputLabel-root": { color: "rgba(0,0,0,0.6)" },
                "& .MuiOutlinedInput-input": { color: "rgba(0,0,0,0.85)" },
              }}
            />
          </Stack>

          <Divider sx={{ opacity: 0.5 }} />

          <Stack spacing={1.5}>
            <Button
              variant="contained"
              sx={{
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                py: 1.35,
                backgroundColor: "rgba(30,30,30,0.92)",
                boxShadow: "0 12px 26px rgba(0,0,0,0.25)",
                "&:hover": { backgroundColor: "rgba(20,20,20,0.98)" },
              }}
            >
              Create account
            </Button>
            <Typography
              sx={{
                fontSize: "0.85rem",
                color: "rgba(0,0,0,0.65)",
                textAlign: "center",
              }}
            >
              By registering you agree to our privacy policy and studio rules.
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

