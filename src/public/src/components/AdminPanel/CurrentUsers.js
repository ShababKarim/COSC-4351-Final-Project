import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import {
    ValidatorForm,
    SelectValidator
} from 'react-material-ui-form-validator';
import { ROLES, LINKROLES, changeAdminStatus } from '../../util';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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

const CurrentUsers = ({ current, setCurrent }) => {
    const classes = useStyles();
    const [formValue, setFormValue] = useState({ email: '', adminType: '' });

    const handleChange = useCallback((select, value) => {
        setFormValue({ ...formValue, [select]: value });
    });

    const handleRevokeorRemoval = useCallback(async changeType => {
        let endpoint;
        switch (changeType) {
            case 'Revoke':
                endpoint = 'api/update/admin-revoke';
                break;
            case 'Remove':
                endpoint = 'api/remove/admin';
                break;
            default:
                endpoint = 'api/update/admin';
        }
        await changeAdminStatus(formValue.email, formValue.adminType, endpoint);
        setFormValue({ email: '', adminType: '' });
    });

    return (
        <div className={classes.wrap}>
            <h2 className={classes.header}>Manage Admins</h2>
            <div className={classes.container}>
                <ValidatorForm onError={errors => console.log(errors)}>
                    <FormControl className={classes.linkSelect}>
                        <SelectValidator
                            id="user-select"
                            label="Employee Email"
                            value={formValue.email}
                            errorMessages={['this field is required']}
                            value={formValue.email}
                            onChange={e =>
                                handleChange('email', e.target.value)
                            }
                        >
                            <MenuItem value={''}></MenuItem>
                            {current.map(({ _id, email, adminType }) => (
                                <MenuItem key={_id} value={email}>
                                    {email + ' - ' + LINKROLES[adminType]}
                                </MenuItem>
                            ))}
                        </SelectValidator>
                    </FormControl>
                    <FormControl className={classes.roleSelect}>
                        <SelectValidator
                            id="admin-select"
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
                            onClick={() => handleRevokeorRemoval('Modify')}
                        >
                            Change
                        </Button>
                        <Button
                            color="secondary"
                            onClick={() => handleRevokeorRemoval('Revoke')}
                        >
                            Revoke
                        </Button>
                        <Button
                            color="primary"
                            onClick={() => handleRevokeorRemoval('Remove')}
                        >
                            Remove
                        </Button>
                    </ButtonGroup>
                </ValidatorForm>
            </div>
        </div>
    );
};

export default CurrentUsers;
