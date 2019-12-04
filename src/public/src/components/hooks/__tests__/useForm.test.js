import { cleanup } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import { useForm } from '../useForm';

afterEach(cleanup);

describe('useCurrent hook', () => {
	it('has empty value with no token', () => {
		const mockEvent = {
			target: {
				name: 'name',
				value: 'Bobby'
			}
		};
		const { result } = renderHook(() => useForm({ name: 'Shabab' }));
		act(() => {
			result.current[1](mockEvent);
		});
		expect(result.current[0]).toStrictEqual({ name: 'Bobby' });
	});
});
