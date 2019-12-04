import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {
    ValidatorForm,
    SelectValidator
} from 'react-material-ui-form-validator';

import { ROLES, changePendingStatus } from '../../util';

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

const PendingUsers = props => {
    const classes = useStyles();
    const [formValue, setFormValue] = useState({
        email: '',
        adminType: ''
    });

    const handleChange = useCallback((select, value) => {
        setFormValue({ ...formValue, [select]: value });
    });

    const handleSubmit = useCallback(async changeType => {
        const endpoint =
            changeType === 'Approve' ? 'api/update/admin' : 'api/remove/admin';
        await changePendingStatus(
            formValue.email,
            formValue.adminType,
            endpoint
        );
        setFormValue({ email: '', adminType: '' });
    });

    return (
        <div className={classes.wrap}>
            <h2 className={classes.header}>Approve Admins</h2>
            <div className={classes.container}>
                <ValidatorForm onError={errors => console.log(errors)}>
                    <FormControl className={classes.linkSelect}>
                        <SelectValidator
                            id="pending-select"
                            label="Employee Email"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            value={formValue.email}
                            onChange={e =>
                                handleChange('email', e.target.value)
                            }
                        >
                            <MenuItem value={''}></MenuItem>
                            {props.pending.map(({ _id, email }) => (
                                <MenuItem key={_id} value={email}>
                                    {email}
                                </MenuItem>
                            ))}
                        </SelectValidator>
                    </FormControl>
                    <FormControl className={classes.roleSelect}>
                        <SelectValidator
                            id="role-select"
                            label="Role"
                            value={formValue.adminType}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            onChange={e =>
                                handleChange('adminType', e.target.value)
                            }
                        >
                            <MenuItem value={''}></MenuItem>
                            {ROLES.map((role, index) => (
                                <MenuItem key={index} value={role[0]}>
                                    {role[1]}
                                </MenuItem>
                            ))}
                        </SelectValidator>
                    </FormControl>
                    <ButtonGroup variant="text" className={classes.button}>
                        <Button
                            color="primary"
                            onClick={() => handleSubmit('Approve')}
                        >
                            Approve
                        </Button>
                        <Button
                            color="secondary"
                            onClick={() => handleSubmit('Deny')}
                        >
                            Deny
                        </Button>
                    </ButtonGroup>
                </ValidatorForm>
            </div>
        </div>
    );
};

export default PendingUsers;
