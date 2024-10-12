import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const MuiThemeProvider = (props) => {
  const mode = useSelector((state) => state.themeMode.mode);
  // console.log("Current Mode:", mode);
  const theme = useMemo(
    () =>
      createTheme({
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
      }),
    [mode]
  );

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default MuiThemeProvider;
