import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useForm } from "../hooks/useForm";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import AuthContext from "../../context";

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
    const { auth, setAuth } = useContext(AuthContext);
    const classes = useStyles();
    const [values, handleChange] = useForm({ email: "", password: "" });

    function handleSubmit(event) {
        event.preventDefault();
        console.log(values);
        fetch("http://localhost:5000/api/login", {
            method: "POST",
            mode: "cors",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password
            })
        })
            .then(res => {
                if (res.status !== 200) throw new Error(res.json());

                return res.json();
            })
            .then(authData => setAuth(authData))
            .catch(err => console.error(err));
    }
    return (
        <ValidatorForm
            className={classes.container}
            onError={errors => console.log("Error", errors)}
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
                    validators={["required"]}
                    errorMessages={["this field is required"]}
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
