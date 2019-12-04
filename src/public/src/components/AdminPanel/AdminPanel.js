import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import { ROLES, changePendingStatus } from '../../util';

const AdminPanel = props => {
	const [formValue, setFormValue] = useState({
		email: '',
		adminType: ''
	});

	const handleChange = (select, value) => {
		setFormValue({ ...formValue, [select]: value });
	};

	const handleSubmit = async changeType => {
		const endpoint =
			changeType === 'Approve' ? 'api/update/admin' : 'api/remove/admin';
		await changePendingStatus(
			formValue.email,
			formValue.adminType,
			endpoint
		);
		setFormValue({ email: '', adminType: '' });
	};

	return (
		<div>
			<FormControl>
				<Select
					id='pending-select'
					value={formValue.email}
					onChange={e => handleChange('email', e.target.value)}
				>
					<MenuItem value={''}></MenuItem>
					{props.pending.map(({ _id, email }) => (
						<MenuItem key={_id} value={email}>
							{email}
						</MenuItem>
					))}
				</Select>
				<Select
					id='role-select'
					value={formValue.adminType}
					onChange={e => handleChange('adminType', e.target.value)}
				>
					<MenuItem value={''}></MenuItem>
					{ROLES.map((role, index) => (
						<MenuItem key={index} value={role}>
							{role}
						</MenuItem>
					))}
				</Select>
				<Button
					variant='outlined'
					color='primary'
					onClick={() => handleSubmit('Approve')}
				>
					Approve
				</Button>
				<Button
					variant='outlined'
					color='secondary'
					onClick={() => handleSubmit('Deny')}
				>
					Deny
				</Button>
			</FormControl>
		</div>
	);
};

export default AdminPanel;
