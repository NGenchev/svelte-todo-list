import { writable } from 'svelte/store'

const authURL = 'https://ngenchev.2create.studio/Mentor/ngenchev/svelte/wordpress/wp-json/jwt-auth/v1/';

export const User = writable( [] );
export const isUserLoggedIn = writable( false );

export const UserRequest = () => {
	User.tryLogin = async( method, url, params = null ) => {
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
			User.set( json );
			isUserLoggedIn.update( () => true );
		} else {
			User.update( data => {
				data.loading = false
				data.errors = json.errors
				isUserLoggedIn.update( () => false );

				return data;
			} )
		}
	}

	User.get 	 = ( url ) => User.request( 'GET', url );
	User.post 	 = ( url, params ) => User.request( 'POST', url, params );
	User.patch  = ( url, params ) => User.request( 'PATCH', url, params );
	User.delete = ( url, params ) => User.request( 'DELETE', url, params );

	return User;
}