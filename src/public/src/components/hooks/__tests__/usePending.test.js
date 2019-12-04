import { cleanup } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import usePending from '../usePending';

afterEach(cleanup);

describe('useCurrent hook', () => {
	it('has empty value with no token', () => {
		const { result } = renderHook(() => usePending());
		expect(result.current[0]).toStrictEqual([]);
	});
});
