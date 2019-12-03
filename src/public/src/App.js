import React from "react";
import "./App.css";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
// import SuperAdmin from "./components/pages/superadmin";
// import LoginSignUpPage from ./components/pages/loginsignin";
import Dashboard from "./components/pages/dashboard";
import grey from "@material-ui/core/colors/grey";

export const theme = createMuiTheme({
  palette: {
    primary: { 500: "#D32F2F" },
    secondary: { light: grey[900], main: grey[900], dark: grey[900] }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
