<script>
	import List from './List.svelte';
	import UserForms from './UserForms.svelte';
	import { User, UserRequest } from './user';
	import Cookies from 'js-cookie';

	const userToken = Cookies.get( '_svelte_app_token' );

	if ( userToken ) {
		const authURL = 'http://ngenchev.2create.studio/Mentor/ngenchev/svelte/wordpress/wp-json/jwt-auth/v1/token/validate';
		const userObject = UserRequest();

		userObject.post( authURL, null, { "Authorization": "Bearer " + userToken } );
	}
</script>

<svelte:head>
	<title>Svelte ToDo List Application</title>
</svelte:head>

<main>
	{#if $User.isLogged}
		<List />
	{:else}
		<UserForms />
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