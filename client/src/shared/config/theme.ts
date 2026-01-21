import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: "#f4efec",
      secondary: "#e0d8d4",
    },
    background: {
      default: "#8f9684",
      paper: "rgba(255,255,255,0.08)",
    },
  },
  typography: {
    fontFamily: "Arial, Helvetica, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
    },
    h2: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },
  },
});

