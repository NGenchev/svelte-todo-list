<script>
	export let todo;

	import { Todos } from '../stores';
	import { User } from './../user';

	import { createEventDispatcher } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	const toggleTodo = () => {
		const todoObject = {...todo, isDone: !todo.isDone };

		Todos.patch( { task: todoObject, user: $User } );
	}

	const editTodo = () => {
		dispatch( 'enable-edit', todo.id );
	}

	const deleteTodo = () => {
		Todos.delete( { task: todo.id, user: $User } );
	}
</script>

<li class="{todo.isDone ? 'is-done' : ''}" on:click={ () => toggleTodo() } in:scale|local out:fade|local>
	<div class="item">
		<div class="item__title">#{todo.id}: {todo.title}</div>

		<div class="item__content">{todo.content}</div>
	</div>

	<div class="item__actions">
		<button class="item__edit" on:click|preventDefault|stopPropagation={ () => editTodo() }></button>
		<button class="item__delete" on:click|preventDefault|stopPropagation={ () => deleteTodo() }></button>
	</div>
</li>

<style>
	li {
		position: relative;
		display: flex;
		cursor: pointer;
		word-break: break-all;
	}

	li:not(:first-child) {
		margin-top: 20px;
	}

	li ::selection {
		color: #faaa7d;
		background: #1e1d37;
	}

	li:before {
		content: '';
		display: block;
		width: 15px;
		height: 15px;
		flex-shrink: 0;
		margin-right: 7px;
		border: 2px solid #af92e8;
		transition: border-color .3s;
		cursor: pointer;
		margin-top: 4px;
	}

	li:hover:before {
		border-color: #7ab5f4;
	}

	li:after {
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
		position: absolute;
		content: 'X';
		font-weight: 700;
		left: 5.5px;
		top: 5px;
		font-size: 12px;
		color: #7ab5f4;
	}

	li.is-done {
		text-decoration: line-through;
	}

	li.is-done:before {
		border-color: #7ab5f4;
	}

	li.is-done:after {
		opacity: 1;
		visibility: visible;
	}

	.item__title {
		display: block;
		font-weight: 700;
		margin-right: 15px;
	}

	.item__content {
		margin-right: 15px;
	}

	.item__actions {
		display: flex;
		flex-shrink: 0;
		margin-left: auto;
		margin-top: 6px;
	}

	.item__actions button {
		display: block;
		width: 25px;
		height: 25px;
		flex-shrink: 0;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center center;
		background-color: unset;
		outline: none;
		border: none;
		cursor: pointer;
	}

	.item__actions button ~ button {
		margin-left: 10px;
	}

	.item__edit {	
		background-image: url('../images/edit.svg');
	}

	.item__delete {
		background-image: url('../images/delete.svg');
	}
</style>