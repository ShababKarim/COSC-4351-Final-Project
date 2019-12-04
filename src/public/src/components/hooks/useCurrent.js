import { useState, useEffect } from 'react';

const fetchOptions = {
	method: 'GET',
	mode: 'cors',
	headers: {
		'x-access-token': sessionStorage.getItem('x-auth-token')
	}
};

const useCurrent = () => {
	const [current, setCurrent] = useState([]);

	useEffect(() => {
		async function getCurrent() {
			try {
				const response = await fetch(
					'http://localhost:5000/api/current',
					fetchOptions
				);
				const res = await response.json();
				if (response.status !== 200) throw new Error(res);
				setCurrent(res);
			} catch (err) {
				alert(err);
			}
		}
		getCurrent();
	}, []);

	return [current, setCurrent];
};

export default useCurrent;
