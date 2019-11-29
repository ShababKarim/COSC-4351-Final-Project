import React from "react";
import Color from "color";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

import {
    makeStyles,
    createMuiTheme,
    ThemeProvider
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import logo from "./images/UH_Red.png";
import Image from "react-image-resizer";
import Grid from "@material-ui/core/Grid";

import EmployeeLogin from "./employeelogin";
import EmployeeSignUpForm from "./emloyeesignup";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`
    };
}
const theme = createMuiTheme({
    palette: {
        primary: { 500: "#D32F2F" }
    }
});
const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(8),
        backgroundColor: theme.palette.background.paper,
        width: 500
    },
    image: {
        flex: 1,
        width: 50,
        height: 50
    },
    tab: {
        "&:hover": {
            "&:not($selected)": {
                backgroundColor: Color("#D32F2F")
                    .fade(0.87)
                    .toString()
            }
        }
    }
}));

const LoginSignUpPage = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid
                container
                spacing={0}
                alignItems="center"
                justify="center"
                className={classes.root}
            >
                <Grid item xs={3}>
                    <Image img src={logo} alt="cur" height={100} width={100} />
                </Grid>
            </Grid>

            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        TabIndicatorProps={{
                            style: { background: Color("#D32F2F") }
                        }}
                    >
                        <Tab
                            label="Employee Login"
                            {...a11yProps(0)}
                            className={classes.tab}
                        />
                        <Tab
                            label="Employee Sign Up"
                            {...a11yProps(1)}
                            className={classes.tab}
                        />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <React.Fragment>
                            <CssBaseline />
                            <Container maxWidth="sm">
                                <EmployeeLogin />
                            </Container>
                        </React.Fragment>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <React.Fragment>
                            <CssBaseline />
                            <Container maxWidth="sm">
                                <EmployeeSignUpForm />
                            </Container>
                        </React.Fragment>
                    </TabPanel>
                </SwipeableViews>
            </div>
        </ThemeProvider>
    );
};

export default LoginSignUpPage;
