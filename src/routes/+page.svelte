<script lang="ts">
	import type { PageData } from './$types';
	type Props = { data: PageData };

	let { data }: Props = $props();
	let name = $state(data.name);
</script>

<h1>Welcome to {name}</h1>
<button onclick={() => (name += 't')}>Change name</button>
