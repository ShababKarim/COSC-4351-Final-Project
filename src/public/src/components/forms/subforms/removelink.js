import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { useForm } from '../../hooks/useForm';
import {
    ValidatorForm,
    SelectValidator
} from 'react-material-ui-form-validator';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex'
    },
    header: { marginTop: theme.spacing(4), marginBottom: theme.spacing(0) },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400
    },
    button: {
        marginLeft: theme.spacing(58)
    },
    linkSelect: {
        marginLeft: theme.spacing(1),
        minWidth: 300
    },
    roleSelect: {
        marginLeft: theme.spacing(10),
        minWidth: 300
    },
    wrap: {
        marginBottom: theme.spacing(10)
    }
}));

const RemoveLink = props => {
    const classes = useStyles();
    const [values, handleChange] = useForm({ link: '', role: '' });

    const handleSubmit = async () => {
        try {
            const response = await fetch(
                'http://localhost:5000/api/remove/link',
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'content-type': 'application/json',
                        'x-access-token': sessionStorage.getItem('x-auth-token')
                    },
                    body: JSON.stringify({
                        url: values.link
                    })
                }
            );
            const res = await response.json();
            if (response.status !== 200) throw new Error(res);
        } catch (err) {
            alert(err);
        }
    };
    return (
        <div className={classes.wrap}>
            <h2 className={classes.header}>Remove Links</h2>
            <div className={classes.container}>
                <ValidatorForm
                    onError={errors => console.log(errors)}
                    onSubmit={handleSubmit}
                >
                    <FormControl className={classes.linkSelect}>
                        <SelectValidator
                            name="link"
                            label="Link"
                            color="secondary"
                            id="link-select"
                            value={values.link}
                            onChange={handleChange}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        >
                            {props.links.map(({ url, _id }) => {
                                return (
                                    <MenuItem key={_id} value={url}>
                                        {url}
                                    </MenuItem>
                                );
                            })}
                        </SelectValidator>
                    </FormControl>

                    <ButtonGroup
                        variant="text"
                        color="primary"
                        className={classes.button}
                    >
                        <Button type="submit">Remove</Button>
                    </ButtonGroup>
                </ValidatorForm>
            </div>
        </div>
    );
};

export default RemoveLink;
