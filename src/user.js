// @login = 'https://ngenchev.2create.studio/Mentor/ngenchev/svelte/wordpress/wp-json/jwt-auth/v1/token/';

import { writable } from 'svelte/store'
import Cookies from 'js-cookie'

export const User = writable( {
	isLogged: false,
	loading: false,
	errors: null,
	username: null,
	token: null,
	email: null,
} );

export const UserRequest = () => {
	User.request = async( method, url, params = null, forceHeaders = null ) => {
		User.update( data => {
			delete data.errors
			data.loading = true

			return data;
		} );

		let headers = { 'Accept': 'application/json, text/plain, */*' };
		if ( forceHeaders ) {
			headers = forceHeaders;
		}

		const body = params ? JSON.stringify( params ) : undefined
		const response = await fetch( url, { method, body, headers } )
		const json = await response.json()

		if ( response.ok ) {
			if ( forceHeaders ) {
				User.set( {
					isLogged: true,
					loading: false,
					errors: null,
					username: Cookies.get( '_svelte_app_username' ),
					token: Cookies.get( '_svelte_app_token' ),
					email: Cookies.get( '_svelte_app_email' ),
				} );
			} else {
				User.set( {
					isLogged: true,
					loading: false,
					errors: null,
					username: json.user_display_name,
					token: json.token,
					email: json.user_email,
				} );

				Cookies.set( '_svelte_app_token', json.token );
				Cookies.set( '_svelte_app_username', json.user_display_name );
				Cookies.set( '_svelte_app_email', json.user_email );
			}
		} else {
			User.update( userObject => {
				userObject.loading = false;
				userObject.errors = json.message;

				return userObject;
			} );
		}
	}

	User.get 	= ( url ) => User.request( 'GET', url );
	User.post 	= ( url, params, headers ) => User.request( 'POST', url, params, headers );
	User.patch  = ( url, params ) => User.request( 'PATCH', url, params );
	User.delete = ( url, params ) => User.request( 'DELETE', url, params );

	return User;
}