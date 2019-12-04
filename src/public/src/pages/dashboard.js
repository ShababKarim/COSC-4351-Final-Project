import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context';

import NavBar from '../components/dash/navbar';
import HomeDrawer from '../components/dash/homeDrawer';
import Links from '../components/dash/links';
import SuperAdminTabs from '../components/superadmin/superadmintabs';

const Dashboard = () => {
	const fetchOptions = {
		method: 'GET',
		mode: 'cors',
		headers: {
			'x-access-token': sessionStorage.getItem('x-auth-token')
		}
	};
	const { auth, setAuth } = useContext(AuthContext);
	const [links, setLinks] = useState([]);
	useEffect(() => {
		async function getLinks() {
			try {
				const response = await fetch(
					'http://localhost:5000/api/links',
					fetchOptions
				);
				const res = await response.json();
				if (response.status !== 200) throw new Error(res);
				setLinks(res);
			} catch (err) {
				alert(err);
			}
		}
		getLinks();
	}, []);
	useEffect(() => {
		async function getSuperAdmin() {
			if (!auth) {
				try {
					const response = await fetch(
						'http://localhost:5000/api/session-user',
						fetchOptions
					);
					const res = await response.json();
					if (response.status !== 200) throw new Error(res);
					setAuth(res);
				} catch (err) {
					alert(err);
				}
			}
		}
		getSuperAdmin();
	}, []);
	return (
		<div>
			<NavBar />
			<HomeDrawer />
			<Links links={links} />
			{auth && auth.adminType === 'SUPER_ADMIN' ? (
				<SuperAdminTabs links={links} />
			) : null}
		</div>
	);
};

export default Dashboard;
