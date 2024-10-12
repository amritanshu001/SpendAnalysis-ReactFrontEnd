import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";

const MuiThemeProvider = (props) => {
  mode = "light";
  useMemo(() => {
    const theme = createTheme({
      palette: {
        mode: "light",
      },
      components: {
        MuiAccordion: {
          styleOverrides: {
            root: {
              width: "90%",
              margin: "auto",
              marginTop: "0.5rem",
              fontWeight: "bold",
              backgroundColor: "#405d27",
              color: "white",
            },
            region: {
              backgroundColor: "white",
            },
          },
        },
      },
    });
  }, [mode]);
};

export default theme;
