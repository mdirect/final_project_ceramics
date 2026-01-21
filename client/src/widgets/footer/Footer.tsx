import { Box, Container, Typography } from "@mui/material";

export function Footer() {
  return (
    <Box component="footer" sx={{ py: 3, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
      <Container>
        <Typography variant="body2" color="text.secondary">
          WSE Jewellery • Ceramic collections and projects
        </Typography>
      </Container>
    </Box>
  );
}

