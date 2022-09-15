<script>
	import TodoList from './components/TodoList.svelte';
	import TodoForm from './components/TodoForm.svelte';
	import TodoEditForm from './components/TodoEditForm.svelte';
	import { fade, scale } from 'svelte/transition';

	let isEdit = false;

	$: isEditMode = isEdit;

	const toggleEditMode = event => {
		isEdit = event.detail;
	}
</script>

<svelte:head>
	<title>Svelte ToDo List Application</title>
</svelte:head>

<main>
	<h1>ToDo List Application</h1>

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

	@media screen and (max-width: 1024px) {
		main {
			padding: 20px;
		}
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
</style>