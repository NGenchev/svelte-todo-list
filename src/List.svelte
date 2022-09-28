<script>
	import TodoList from './components/TodoList.svelte';
	import TodoForm from './components/TodoForm.svelte';
	import TodoEditForm from './components/TodoEditForm.svelte';
	import { fade } from 'svelte/transition';

	const baseAPI = 'http://ngenchev.2create.studio/Mentor/ngenchev/svelte/wordpress/wp-json/app/';

	let tasksURL = baseAPI + "tasks/";

	import { TodosRequest } from './stores';

	const todosObject = TodosRequest();
	todosObject.get( tasksURL );

	let isEdit = false;

	$: isEditMode = isEdit;

	const toggleEditMode = event => {
		isEdit = event.detail;
	}
</script>

<svelte:head>
	<title>Svelte ToDo List Application</title>
</svelte:head>

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
</style>