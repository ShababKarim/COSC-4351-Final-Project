import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useForm } from "../../hooks/useForm";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex"
    },
    header: { marginTop: theme.spacing(2), marginBottom: theme.spacing(0) },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400
    },
    button: {
        marginLeft: theme.spacing(10)
    },
    wrap: {
        marginBottom: theme.spacing(10)
    }
}));

const CreateRemove = () => {
    const classes = useStyles();
    const [values, handleChange] = useForm({ empID: "" });

    function handleSubmit(event) {
        event.preventDefault();
        console.log(values);
    }
    return (
        <div className={classes.wrap}>
            <h2 className={classes.header}>Create or Remove Admin:</h2>
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
                    <ButtonGroup
                        variant="text"
                        color="primary"
                        className={classes.button}
                    >
                        <Button type="submit">Create</Button>
                        <Button type="submit">Remove</Button>
                    </ButtonGroup>
                </ValidatorForm>
            </div>
        </div>
    );
};

export default CreateRemove;
