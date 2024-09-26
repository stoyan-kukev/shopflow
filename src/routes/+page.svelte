<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	type Props = { data: PageData };

	let { data }: Props = $props();
	let names = $state(data.data);
</script>

<!-- {#each names as name}
	<h1>Welcome to {name.id}</h1>
{/each} -->

<a href="/logout"><button>Log out</button></a>
