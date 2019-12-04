import { cleanup } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import useCurrent from '../useCurrent';

afterEach(cleanup);

describe('useCurrent hook', () => {
	it('has empty value with no token', () => {
		const { result } = renderHook(() => useCurrent());
		expect(result.current[0]).toStrictEqual([]);
	});
});
