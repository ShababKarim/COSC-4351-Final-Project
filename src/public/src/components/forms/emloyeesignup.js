import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const EmployeeSignUpForm = () => {
    const classes = useStyles();

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <div>
                <TextField
                    required
                    id="standard-required"
                    label="First Name"
                    placeholder="first name"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <TextField
                    required
                    id="standard-required"
                    label="Last Name"
                    placeholder="last name"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <TextField
                    required
                    id="standard-required"
                    label="Employee ID"
                    placeholder="employee id"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <TextField
                    required
                    id="standard-password-input"
                    label="Password"
                    placeholder="password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <TextField
                    required
                    id="standard-password-input"
                    label="Confirm Password"
                    placeholder="re-enter password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Submit
            </Button>
        </form>
    );
};

export default EmployeeSignUpForm;
