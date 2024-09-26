<script lang="ts">
	import type { PageServerData } from './$types';

	const { data }: { data: PageServerData } = $props();
</script>

Hello, {data.username}!
