import React from "react";
import "./App.css";
import SuperAdmin from "./components/superadmin/superadmin";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: { 500: "#D32F2F" }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SuperAdmin />
    </ThemeProvider>
  );
}

export default App;
