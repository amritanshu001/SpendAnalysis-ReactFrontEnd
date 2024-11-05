import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const MuiThemeProvider = (props) => {
  const mode = useSelector((state) => state.themeMode.mode);
  // console.log("Current Mode:", mode);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          primary: {
            main: "#5f3e93",
          },
          secondary: {
            main: "#72933e",
          },
          header: {
            main: "#002e94",
            dark: "#002067",
            light: "#3357a9",
          },
          secHeader: {
            main: "#667d52",
            dark: "#475739",
            light: "#849774",
          },
        },
        components: {
          MuiAccordion: {
            styleOverrides: {
              region: {
                backgroundColor: mode === "light" ? "white" : "#37474f",
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
