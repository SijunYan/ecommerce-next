import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#f0c000",
    },
    secondary: {
      main: "#208080",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    h1: { fontSize: "1.6rem", fontWeight: "bold", margin: "1rem 0" },
    h1: { fontSize: "1.4rem", fontWeight: "bold", margin: "1rem 0" },
  },
});

export default theme;
