import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { useForm } from "../../hooks/useForm";
import {
    ValidatorForm,
    TextValidator,
    SelectValidator
} from "react-material-ui-form-validator";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex"
    },
    header: { marginTop: theme.spacing(4), marginBottom: theme.spacing(0) },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400
    },
    button: {
        marginLeft: theme.spacing(10)
    },
    formControl: {
        marginLeft: theme.spacing(10),
        minWidth: 120
    },
    wrap: {
        marginBottom: theme.spacing(10)
    }
}));

const UpdateRole = () => {
    const classes = useStyles();
    const [values, handleChange] = useForm({ empID: "", role: "" });

    function handleSubmit(event) {
        event.preventDefault();
        console.log(values);
    }

    return (
        <div className={classes.wrap}>
            <h2 className={classes.header}>Update Admin Role:</h2>
            <div className={classes.container}>
                <ValidatorForm
                    onError={errors => console.log(errors)}
                    onSubmit={handleSubmit}
                >
                    <TextValidator
                        name="empID"
                        label="Employee ID"
                        id="standard-basic"
                        value={values.empID}
                        className={classes.textField}
                        onChange={handleChange}
                        validators={["required", "matchRegexp:^\\w{4,30}$"]}
                        errorMessages={[
                            "this field is required",
                            "id is not valid"
                        ]}
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">
                            Role
                        </InputLabel>
                        <SelectValidator
                            name="role"
                            label="Role"
                            color="secondary"
                            id="role-select"
                            value={values.role}
                            onChange={handleChange}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </SelectValidator>
                    </FormControl>
                    <ButtonGroup
                        variant="text"
                        color="primary"
                        className={classes.button}
                    >
                        <Button type="submit">Update</Button>
                    </ButtonGroup>
                </ValidatorForm>
            </div>
        </div>
    );
};

export default UpdateRole;
