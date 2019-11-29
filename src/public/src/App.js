import React from "react";
import "./App.css";
import LoginSignUpPage from "./components/tab";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
function App() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <LoginSignUpPage />
            </Container>
        </React.Fragment>
    );
}

export default App;
