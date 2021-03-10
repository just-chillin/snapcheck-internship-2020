import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { DBView } from "./components/DBView";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="DBView">
        <DBView />
      </div>
    </ThemeProvider>
  );
}

export default App;
