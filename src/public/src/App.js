import React from "react";
import "./App.css";
import FullWidthTabs from "./components/tab";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
function App() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">{FullWidthTabs()}</Container>
        </React.Fragment>
    );
}

export default App;
