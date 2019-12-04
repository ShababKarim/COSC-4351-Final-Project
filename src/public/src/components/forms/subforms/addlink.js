import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { useForm } from '../../hooks/useForm';
import {
    ValidatorForm,
    TextValidator,
    SelectValidator
} from 'react-material-ui-form-validator';

import { ROLES } from '../../../util';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex'
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
    formControl: {
        marginLeft: theme.spacing(10),
        minWidth: 120
    },
    wrap: {
        marginBottom: theme.spacing(10)
    }
}));

const AddLink = props => {
    const classes = useStyles();
    const [values, handleChange] = useForm({ link: '', role: '' });

    function handleSubmit(event) {
        fetch('http://localhost:5000/api/add/link', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'x-access-token': sessionStorage.getItem('x-auth-token')
            },
            body: JSON.stringify({
                url: values.link,
                adminType: values.role
            })
        })
            .then(res => {
                if (res.status !== 200) throw new Error(res.text());

                return res.text();
            })
            .then(console.log)
            .catch(err => alert(err));
    }
    return (
        <div className={classes.wrap}>
            <h2 className={classes.header}>Add Link:</h2>
            <div className={classes.container}>
                <ValidatorForm
                    onError={errors => console.log(errors)}
                    onSubmit={handleSubmit}
                >
                    <TextValidator
                        name="link"
                        label="Link"
                        id="link"
                        color="secondary"
                        className={classes.textField}
                        value={values.link}
                        onChange={handleChange}
                        validators={['required', 'matchRegexp:^\\w.{0,30}$']}
                        errorMessages={[
                            'this field is required',
                            'link is not valid'
                        ]}
                    />
                    <FormControl className={classes.formControl}>
                        <SelectValidator
                            name="role"
                            label="Role"
                            color="secondary"
                            id="role-select"
                            value={values.role}
                            onChange={handleChange}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        >
                            <MenuItem value={''}></MenuItem>
                            {ROLES.map((role, index) => (
                                <MenuItem key={index} value={role[0]}>
                                    {role[1]}
                                </MenuItem>
                            ))}
                        </SelectValidator>
                    </FormControl>
                    <ButtonGroup
                        variant="text"
                        color="primary"
                        className={classes.button}
                    >
                        <Button type="submit">Add</Button>
                    </ButtonGroup>
                </ValidatorForm>
            </div>
        </div>
    );
};

export default AddLink;
