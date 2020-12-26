import React, { useMemo } from "react";
import { Container, useMediaQuery } from "@material-ui/core";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { deepPurple, amber } from "@material-ui/core/colors";
import { BrowserRouter, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

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
        <BrowserRouter>
          {/* <Route path="/" exact component={() => <>gfdgfd</>} /> */}
          <Route path="/" exact component={() => <SignupPage />} />
          <Route path="/login" exact component={() => <LoginPage />} />
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
};

export default App;
