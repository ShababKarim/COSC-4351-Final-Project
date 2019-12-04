import React, { useState } from 'react';
import { render, cleanup } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import Dashboard from '../dashboard';

import AuthContext from '../../context';

afterEach(cleanup);

describe('Dashboard', () => {
	it('renders without crashing', () => {
		const { result } = renderHook(() =>
			useState({
				_id: 1,
				name: 'test',
				email: 'test@gmail.com'
			})
		);
		const change = newObj => (result.current = newObj);
		const { asFragment } = render(
			<AuthContext.Provider
				value={{ auth: result.current, setAuth: change }}
			>
				<Dashboard />
			</AuthContext.Provider>
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
