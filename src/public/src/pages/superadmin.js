import React from 'react';
import NavBar from '../components/dash/navbar';
import HomeDrawer from '../components/dash/homeDrawer';
import SuperAdminTabs from '../components/superadmin/superadmintabs';

const SuperAdmin = () => {
	return (
		<div>
			<NavBar />
			<HomeDrawer />
			<SuperAdminTabs />
		</div>
	);
};

export default SuperAdmin;
