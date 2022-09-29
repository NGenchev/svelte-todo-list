import { writable } from 'svelte/store'
import Cookies from 'js-cookie'
import Config from './config';

export const Todos = writable( [] );

export const TodosRequest = () => {
	Todos.request = async( method, params = null ) => {
		const tasksURL = Config.API_URL + 'app/tasks/';

		Todos.update( data => {
			delete data.errors
			data.loading = true

			return data;
		} );

		const userToken = Cookies.get( '_svelte_app_token' )

		const headers = { 
			"Authorization": "Bearer " + userToken,
		};

		const body = params ? JSON.stringify( params ) : undefined;
		const response = await fetch( tasksURL, { method, body, headers } );
		const json = await response.json();

		if ( response.ok ) {
			Todos.set( json )
		} else {
			Todos.update( data => {
				data.loading = false;
				data.errors = json.errors;

				return data;
			} )
		}
	}

	Todos.get 	 = () => Todos.request( 'GET', );
	Todos.post 	 = params => Todos.request( 'POST', params );
	Todos.patch  = params => Todos.request( 'PATCH', params );
	Todos.delete = params => Todos.request( 'DELETE', params );

	return Todos;
}