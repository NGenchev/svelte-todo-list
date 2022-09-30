<script>
	import { User, UserRequest } from './../user';

	let username = '';
	let password = '';

	let hasError = false;
	let isSuccessVisible = false;

	let errMessage = "";

	const userObject = UserRequest();

	const handleSubmit = () => {
		errMessage = "";
		hasError = false;

		if ( ! username || username.length < 3 ) {
			hasError = true;
			errMessage += "Please enter minimum 3 letters for the username<br>";
		}

		if ( ! password || password.length < 3 ) {
			hasError = true;
			errMessage += "Please enter minimum 3 symbols for the password";
		}

		if ( ! hasError ) {			
			userObject.post( 'jwt-auth/v1/token', { username, password } );
			isSuccessVisible = true;
		}
	}
</script>

<section class="section-form">
	<h2>Log In</h2>

	{#if hasError }
		<h4 class="section__message section__message--error">{@html errMessage}</h4>
	{:else if $User.errors }
		<h4 class="section__message section__message--error">{@html $User.errors}</h4>
	{:else if isSuccessVisible }
		<h4 class="section__message section__message--success">Successfuly logged in!</h4>
	{/if}

	<form on:submit|preventDefault={ handleSubmit }>
		<div class="form__row">
			<label for="username">Username</label>
			
			<input type="text" name="username" id="username" bind:value={username} />
		</div>

		<div class="form__row">
			<label for="password">Password</label>
			
			<input type="password" name="password" id="password" bind:value={password} />
		</div>

		<div class="form__actions">
			<input type="submit" name="submit" value="Log In">
		</div>
	</form>
</section>

<style>
	.section-form {
		width: 50%;
		flex-shrink: 0;
		margin: 0 auto;
		background-color: #a8c7ef;
		padding: 4rem 2.5rem;
		text-align: left;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
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
	input[type="password"] {
		width: 100%;
		padding: .6rem;
		border-radius: 10px;
	}

	input[type="submit"] {
		width: 50%;
		border: none;
		border-radius: 10px;
		cursor: pointer;
		padding: .75rem .6rem;
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

	@media screen and (max-width: 767px) {
		.section-form {
			width: 100%;
			border-top-left-radius: 0;
			border-top-right-radius: 0;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
			padding: 20px;
		}
	}
</style>