<script>
	import { fade } from 'svelte/transition';

	import LoginForm from './components/LoginForm.svelte';
	import RegisterForm from './components/RegisterForm.svelte';
</script>

<svelte:head>
	<title>Svelte ToDo List Application</title>
</svelte:head>

<h1>ToDo List Application</h1>

<div class="split-section" in:fade={{ delay: 300 }} out:fade={{ duration: 300 }}>
	<LoginForm />
	<RegisterForm />
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
</style>