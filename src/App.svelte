<script>
	import List from './List.svelte';
	import User from './User.svelte';
	import { isUserLoggedIn } from './user';
</script>

<svelte:head>
	<title>Svelte ToDo List Application</title>
</svelte:head>

<main>
	{#if $isUserLoggedIn}
		<List />
	{:else}
		<User />
	{/if}
</main>

<style>
	:global(body) {
		padding: 0;
	}

	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		outline: none;
	}

	:global(*:focus) {
		outline: none;
	}

	main {
		text-align: center;
		padding: 5em;
		min-height: 100vh;
		background: linear-gradient(to top, #141e30, #1e1d37);
	}

	@media screen and (max-width: 1024px) {
		main {
			padding: 20px;
		}
	}
</style>