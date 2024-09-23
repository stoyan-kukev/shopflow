import { treaty } from '@elysiajs/eden';
import type { Backend } from '$lib/server';

export const load = async () => {
	const backend = treaty<Backend>('http://localhost:5173');
	const { data, error } = await backend.api.index.get();

	return { name: data };
};
