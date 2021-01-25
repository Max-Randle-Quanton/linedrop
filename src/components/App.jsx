import React, { useMemo } from "react";
import { Container, useMediaQuery } from "@material-ui/core";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { deepPurple, amber } from "@material-ui/core/colors";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import UserDataContextProvider from "./UserDataContext";
import RestrictedRoute from "./RestrictedRoute";
import GroupList from "./GroupList";

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
      <UserDataContextProvider>
        <Container>
          <BrowserRouter>
            <RestrictedRoute
              path="/"
              exact
              RestrictedComponent={() => <GroupList />}
              UnrestrictedComponent={() => <Redirect to="/login" />}
            />
            <Route path="/signup" exact component={() => <SignupPage />} />
            <Route path="/login" exact component={() => <LoginPage />} />
          </BrowserRouter>
        </Container>
      </UserDataContextProvider>
    </ThemeProvider>
  );
};

export default App;
