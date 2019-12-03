import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useForm } from "../hooks/useForm";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

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
    const [values, handleChange] = useForm({
        name: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });
    useEffect(() => {
        ValidatorForm.addValidationRule("isPasswordMatch", value => {
            if (value !== values.password) {
                return false;
            }
            return true;
        });
    });
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
                    name="name"
                    id="first-name"
                    label="Full Name"
                    placeholder="first name"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                        shrink: true
                    }}
                    color="secondary"
                    value={values.name}
                    onChange={handleChange}
                    validators={["required", "matchRegexp:^[a-zA-Z\\s]{0,30}$"]}
                    errorMessages={[
                        "this field is required",
                        "name is not valid"
                    ]}
                />
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
                    validators={["required", "matchRegexp:^(?=.*\\d).{6,30}$"]}
                    errorMessages={[
                        "this field is required",
                        "password is not valid"
                    ]}
                />
                <TextValidator
                    required
                    name="passwordConfirm"
                    id="confirm-password"
                    label="Confirm Password"
                    placeholder="re-enter password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                        shrink: true
                    }}
                    color="secondary"
                    value={values.passwordConfirm}
                    onChange={handleChange}
                    validators={["isPasswordMatch", "required"]}
                    errorMessages={[
                        "password mismatch",
                        "this field is required"
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
                Sign Up
            </Button>
        </ValidatorForm>
    );
};

export default EmployeeSignUpForm;
