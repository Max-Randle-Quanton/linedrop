import React, { useMemo } from "react";
import { Button, Container, useMediaQuery } from "@material-ui/core";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { deepPurple, amber } from "@material-ui/core/colors";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: {
            main: deepPurple[400],
          },
          secondary: {
            main: amber[800],
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Button variant="outlined" color="secondary">
          leshko
        </Button>
      </Container>
    </ThemeProvider>
  );
};

export default App;
