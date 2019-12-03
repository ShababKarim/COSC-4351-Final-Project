import { useState } from 'react';

export const useForm = initiialValues => {
	const [values, setValues] = useState(initiialValues);
	function handleChange(e) {
		setValues({
			...values,
			[e.target.name]: e.target.value
		});
	}
	return [values, handleChange];
};
