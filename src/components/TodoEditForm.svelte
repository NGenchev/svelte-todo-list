<script>
	export let todoId;

	import { createEventDispatcher } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { Todos } from './../stores';

	let currentTodo = $Todos.filter( todo => todo.id == todoId )[0];
	let title = currentTodo.title;
	let content = currentTodo.content;

	const dispatch = createEventDispatcher();

	let hasError = false;
	let isSuccessVisible = false;
	let submitted = false;

	let errMessage = "";

	const handleSubmit = form => {
		errMessage = "";
		hasError = false;

		if ( ! title || title.length < 3 ) {
			hasError = true;
			errMessage += "Please enter minimum 3 letters for the title<br>";
		}

		if ( ! content || content.length < 10 ) {
			hasError = true;
			errMessage += "Please enter minimum 10 letters for the content";
		}

		if ( ! hasError ) {
			Todos.update( lastTodos => {
				return lastTodos.map( todo => {
					if ( todo.id === todoId ) {
						todo.title = title;
						todo.content = content;
						todo.isDone = false;
					}

					return todo;
				} );
			} );

			dispatch( 'disable-edit', false );
			isSuccessVisible = true;
		}
	}
</script>

<section class="section-form section-form--alt">
	<h2>Edit Task #{currentTodo.id}: {currentTodo.title}</h2>

	{#if hasError}
		<h4 class="section__message section__message--error">{@html errMessage}</h4>
	{:else if isSuccessVisible }
		<h4 class="section__message section__message--success">Successfuly added a new task!</h4>
	{/if}

	<form on:submit|preventDefault={ handleSubmit }>
		<div class="form__row">
			<label for="title">Title</label>
			
			<input type="text" name="title" id="title" bind:value={title}/>
		</div>

		<div class="form__row">
			<label for="content">Content</label>
			
			<textarea id="content" bind:value={content}></textarea>
		</div>

		<div class="form__actions">
			<input type="submit" name="submit">
		</div>
	</form>
</section>

<style>
	.section-form {
		width: 100%;
		flex-shrink: 0;
		margin: 0 auto;
		background-color: #a8c7ef;
		padding: 4rem 2.5rem;
		text-align: left;
		border-radius: 10px;
	}

	h2 {
		color: #22292e;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
		margin-bottom: 30px;
	}

	label {
		margin-bottom: 8px;
		font-weight: 100;
		text-transform: uppercase;
	}

	input[type="text"],
	textarea {
		width: 100%;
		padding: .6rem;
		border-radius: 10px;
	}

	textarea {
		height: 200px;
		resize: none;
	}

	input[type="submit"] {
		width: 50%;
		border: none;
		border-radius: 10px;
		cursor: pointer;
		padding: .75rem.6rem;
		background-color: #fff;
		border: 3px solid #faaa7d;
		transition: background-color .3s, border-color .3s, color .3s;
		font-weight: 700;
	}

	input[type="submit"]:hover {
		background-color: #faaa7d;
		border-color: #fff;
		color: #121212;
	}

	.form__row:not(:first-child) {
		margin-top: 20px;
	}

	.form__actions {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}

	.section__message {
		border-radius: 10px;
		padding: 1rem;
		margin-bottom: 25px;
		line-height: 1.45;
		color: #fff;
		font-weight: 400;
	}

	.section__message--error {
		background-color: #af002c;

	}
	.section__message--success {
		background-color: #24be4d;
	}
</style>