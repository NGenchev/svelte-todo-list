<script>
	export let todo;

	import { Todos } from '../stores';
	import { createEventDispatcher } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	const toggleTodo = itemId => {
		Todos.update( lastTodos => {
			return lastTodos.map( (item) => {
				if ( item.id == itemId ) {
					item.isDone = ! item.isDone;
				}

				return item;
			} );
		} );
	}

	const dispatch = createEventDispatcher();

	const editTodo = itemId => {
		dispatch( 'enable-edit', itemId );
	}

	const deleteTodo = itemId => {
		Todos.update( lastTodos => {
			return lastTodos.filter( (item) => {
				return item.id !== itemId;
			} );
		} );
	}
</script>

<li class="{todo.isDone ? 'is-done' : ''}" on:click={ () => toggleTodo( todo.id ) } in:scale|local out:fade|local>
	<div class="item">
		<div class="item__title">#{todo.id}: {todo.title}</div>

		<div class="item__content">{todo.content}</div>
	</div>

	<div class="item__actions">
		<button class="item__edit" on:click|preventDefault|stopPropagation={ () => editTodo( todo.id ) }></button>
		<button class="item__delete" on:click|preventDefault|stopPropagation={ () => deleteTodo( todo.id ) }></button>
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

	li ~ li {
		margin-top: 20px;
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
		background-image: url('/images/edit.svg');
	}

	.item__delete {
		background-image: url('/images/delete.svg');
	}
</style>