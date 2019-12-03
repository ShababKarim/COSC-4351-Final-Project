import React from 'react';
import NavBar from '../components/dash/navbar';
import HomeDrawer from '../components/dash/homeDrawer';
import Links from '../components/dash/links';

const Dashboard = () => {
	return (
		<div>
			<NavBar />
			<HomeDrawer />
			<Links />
		</div>
	);
};

export default Dashboard;
