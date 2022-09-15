<script>
	import { Todos } from '../stores';
	import TodoItem from './TodoItem.svelte';
</script>

<section class="section-list">
	<h2>All Added Tasks</h2>

	{#if $Todos && $Todos.length}
		<ul>
			{#each $Todos as todo (todo.id)}
				<TodoItem todo={todo} on:enable-edit />
			{/each}
		</ul>
	{:else}
		<h4>No Todos Left..</h4>
	{/if}
</section><!-- /.section-list -->

<style>
	.section-list {
		margin: 0 auto;
		width: 50%;
		flex-shrink: 0;
		background-color: #faaa7d;
		padding: 4rem 2.5rem;
		text-align: left;
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
	}

	ul {
		list-style: none;
		text-align: left;
	}

	h2 {
		color: #22292e;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
		margin-bottom: 30px;
	}

	@media screen and (max-width: 767px) {
		.section-list {
			width: 100%;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
			padding: 20px 20px 50px;
		}
	}
</style>