import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export default function UncontrolledTextField() {
    const classes = useStyles();

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <div>
                <TextField
                    required
                    id="standard-full-width"
                    label="Email"
                    placeholder="email"
                    fullWidth
                    margin="normal"
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
            </div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Login
            </Button>
        </form>
    );
}
