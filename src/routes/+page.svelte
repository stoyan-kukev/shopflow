<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	type Props = { data: PageData };

	let { data }: Props = $props();
	let names = $state(data.data);
</script>

{#if names}
	{#each names as { username }}
		<h1>Welcome to {username}</h1>
	{/each}
{/if}

<a href="/logout" data-sveltekit-preload-data="false"><button>Log out</button></a>
