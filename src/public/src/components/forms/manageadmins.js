import React from 'react';
import usePending from '../hooks/usePending';
import useCurrent from '../hooks/useCurrent';

import PendingUsers from '../AdminPanel/PendingUsers';
import CurrentUsers from '../AdminPanel/CurrentUsers';

const ManageAdminsForm = props => {
	const [pending, setPending] = usePending();
	const [current, setCurrent] = useCurrent();
	return (
		<div>
			<PendingUsers pending={pending} setPending={setPending} />
			<CurrentUsers current={current} setCurrent={setCurrent} />
		</div>
	);
};

export default ManageAdminsForm;
