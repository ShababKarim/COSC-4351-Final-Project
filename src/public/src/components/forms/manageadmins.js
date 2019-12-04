import React from 'react';
import usePending from '../hooks/usePending';
import useCurrent from '../hooks/useCurrent';

import AdminPanel from '../AdminPanel/AdminPanel';

const ManageAdminsForm = props => {
	const [pending, setPending] = usePending();
	const [current, setCurrent] = useCurrent();
	return (
		<div>
			<AdminPanel pending={pending} />
		</div>
	);
};

export default ManageAdminsForm;
