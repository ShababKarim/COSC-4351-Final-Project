export const ROLES = [
	'ADMIN',
	'SALES_ADMIN',
	'ENGG_ADMIN',
	'HR_ADMIN',
	'FINANCE_ADMIN'
];

export async function changePendingStatus(email, adminType, endpoint) {
	try {
		const response = await fetch('http://localhost:5000/' + endpoint, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'content-type': 'application/json',
				'x-access-token': sessionStorage.getItem('x-auth-token')
			},
			body: JSON.stringify({
				email,
				adminType
			})
		});
		const res = await response.text();
		if (response.status !== 200) throw new Error(res);
	} catch (err) {
		alert(err);
	}
}
