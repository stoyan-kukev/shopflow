import { treaty } from '@elysiajs/eden';
import type { Backend } from '$lib/server';

const backend = treaty<Backend>('http://localhost:5173');

export async function load() {
	const { data, error } = await backend.api.index.get();

	return { data };
}
