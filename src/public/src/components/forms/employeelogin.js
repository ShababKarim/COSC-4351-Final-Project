import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useForm } from "../hooks/useForm";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        backgroundColor: "transparent"
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

const EmployeeLogin = () => {
    const classes = useStyles();
    const [values, handleChange] = useForm({ email: "", password: "" });

    function handleSubmit(event) {
        event.preventDefault();
        console.log(values);
    }
    return (
        <ValidatorForm
            className={classes.container}
            onError={errors => console.log(errors)}
            onSubmit={handleSubmit}
        >
            <div>
                <TextValidator
                    required
                    name="email"
                    id="email"
                    label="Email"
                    placeholder="email"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true
                    }}
                    color="secondary"
                    value={values.email}
                    onChange={handleChange}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                        "this field is required",
                        "email is not valid"
                    ]}
                />
                <TextValidator
                    required
                    name="password"
                    id="password"
                    label="Password"
                    placeholder="password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                        shrink: true
                    }}
                    color="secondary"
                    value={values.password}
                    onChange={handleChange}
                    validators={["required", "matchRegexp:^(?=.*d).{6,30}$"]}
                    errorMessages={[
                        "this field is required",
                        "password is not valid"
                    ]}
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
        </ValidatorForm>
    );
};

export default EmployeeLogin;
