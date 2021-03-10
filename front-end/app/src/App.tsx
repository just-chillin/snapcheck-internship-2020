import React from "react";
import "./App.css";
import { DBView } from "./DBView";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Route, Switch } from "react-router";
import { AuthPage } from "./AuthPage";
const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

/**
 * Component that conditionally renders it's children depending on whether or
 * not valid credentials are found in local storage.
 */
function AuthRequired({children}: React.PropsWithChildren<{}>) {
  const is_authenticated = localStorage.getItem("auth_token") !== null;
  if (is_authenticated) {
    return <>{children}</>;
  } else {
    return <AuthPage />
  }
}

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthRequired>
        <DBView />
      </AuthRequired>
    </ThemeProvider>
  );
}