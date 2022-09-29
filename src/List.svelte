<script>
	import Cookies from 'js-cookie'

	import { TodosRequest } from './stores';
	import { User } from './user';
	
	import { fade } from 'svelte/transition';
	
	import TodoList from './components/TodoList.svelte';
	import TodoForm from './components/TodoForm.svelte';
	import TodoEditForm from './components/TodoEditForm.svelte';

	const todosObject = TodosRequest();
	todosObject.get();

	let isEdit = false;

	$: isEditMode = isEdit;

	const toggleEditMode = event => {
		isEdit = event.detail;
	}

	const handleLogout = event => {
		Cookies.remove('_svelte_app_token');
		Cookies.remove('_svelte_app_username');
		Cookies.remove('_svelte_app_email');

		User.set( {
			isLogged: false,
			loading: false,
			errors: null,
			username: null,
			token: null,
			email: null,
		} );
	}
</script>

<svelte:head>
	<title>Svelte ToDo List Application</title>
</svelte:head>

<h1>
	{ $User.username }'s ToDo List Application
</h1>

{#if !isEditMode}
	<div class="split-section" in:fade={{ delay: 300 }} out:fade={{ duration: 300 }}>
		<TodoForm />
		<TodoList on:enable-edit={toggleEditMode}/>
	</div>
{:else}
	<div class="split-section" in:fade={{ delay: 300 }} out:fade={{ duration: 300 }}>
		<TodoEditForm todoId={isEditMode} on:disable-edit={toggleEditMode} />
	</div>
{/if}

<div class="section__logout">
	<a href="/logout" on:click|preventDefault={ handleLogout }>Logout</a>
</div>

<style>
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		margin-bottom: 50px;
	}

	.split-section {
		display: flex;
		max-width: 1240px;
		margin: 0 auto;
	}

	@media screen and (max-width: 767px) {
		h1 {
			font-size: 3em;
		}
		
		.split-section {
			flex-wrap: wrap;	
			flex-direction: column-reverse;
		}
	}

	.section__logout {
		text-align: right;
		padding: 20px 0;
		max-width: 1240px;
		margin: 0 auto;
	}

	.section__logout a {
		background: #AB4848;
		color: #E2CFEA;
		text-decoration: none;
		padding: 8px 25px;
		border-radius: 6px;
		transition: color .3s;
	}

	.section__logout a:hover {
		color: #102B3F;
	}
</style>