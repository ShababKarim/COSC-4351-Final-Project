import React from "react";
import "./App.css";
import SuperAdmin from "./components/superadmin/superadmin";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
//import LoginSignUpPage from "./components/loginsignin";
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
            <SuperAdmin />
        </ThemeProvider>
    );
}

export default App;
