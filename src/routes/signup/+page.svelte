<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h1>Sign up</h1>
<form method="post" use:enhance>
	<label for="username">Username</label>
	<input name="username" id="username" />
	<label for="password">Username</label>
	<input name="password" id="password" type="password" />
	<button type="submit">Continue</button>
</form>
