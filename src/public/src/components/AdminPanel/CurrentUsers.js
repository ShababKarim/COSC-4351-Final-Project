import React, { useState, useCallback } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import { ROLES, changeAdminStatus } from '../../util';

const CurrentUsers = ({ current, setCurrent }) => {
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
		<div>
			<FormControl>
				<Select
					id='user-select'
					value={formValue.email}
					onChange={e => handleChange('email', e.target.value)}
				>
					<MenuItem value={''}></MenuItem>
					{current.map(({ _id, email }) => (
						<MenuItem key={_id} value={email}>
							{email}
						</MenuItem>
					))}
				</Select>
				<Select
					id='admin-select'
					value={formValue.adminType}
					onChange={e => handleChange('adminType', e.target.value)}
				>
					<MenuItem value={''}></MenuItem>
					{ROLES.map((role, index) => (
						<MenuItem key={index} value={role[0]}>
							{role[1]}
						</MenuItem>
					))}
				</Select>
				<Button
					color='primary'
					onClick={() => handleRevokeorRemoval('Modify')}
				>
					Change
				</Button>
				<Button
					color='secondary'
					onClick={() => handleRevokeorRemoval('Revoke')}
				>
					Revoke
				</Button>
				<Button onClick={() => handleRevokeorRemoval('Remove')}>
					Remove
				</Button>
			</FormControl>
		</div>
	);
};

export default CurrentUsers;
