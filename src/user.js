import { writable } from 'svelte/store'

const authURL = 'https://ngenchev.2create.studio/Mentor/ngenchev/svelte/wordpress/wp-json/jwt-auth/v1/';

export const User = writable( {
	isLogged: false,
	loading: false,
	errors: null,
	username: null,
	token: null,
	email: null,
} );

export const UserRequest = () => {
	User.request = async( method, url, params = null ) => {
		User.update( data => {
			delete data.errors
			data.loading = true

			return data;
		} );

		const headers = { 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' }
		const body = params ? JSON.stringify( params ) : undefined
		const response = await fetch( url, { method, body, headers } )
		const json = await response.json()

		if ( response.ok ) {
			User.set( {
				isLogged: true,
				loading: false,
				errors: null,
				username: json.user_display_name,
				token: json.token,
				email: json.user_email,
			} );
		} else {
			User.update( userObject => {
				userObject.loading = false;
				userObject.errors = json.message;

				return userObject;
			} );
		}
	}

	User.get 	= ( url ) => User.request( 'GET', url );
	User.post 	= ( url, params ) => User.request( 'POST', url, params );
	User.patch  = ( url, params ) => User.request( 'PATCH', url, params );
	User.delete = ( url, params ) => User.request( 'DELETE', url, params );

	return User;
}