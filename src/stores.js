import { writable } from 'svelte/store'

export const Todos = writable( [] );

export const TodosRequest = () => {
	Todos.request = async( method, url, params = null ) => {
		Todos.update( data => {
			delete data.errors
			data.loading = true

			return data;
		} );

		const headers = { "Content-type": "application/json" }
		const body = params ? JSON.stringify( params ) : undefined
		const response = await fetch( url, { method, body, headers } )
		const json = await response.json()

		if ( response.ok ) {
			Todos.set( json )
		} else {
			Todos.update( data => {
				data.loading = false
				data.errors = json.errors

				return data;
			} )
		}
	}

	Todos.get 	 = ( url ) => Todos.request( 'GET', url );
	Todos.post 	 = ( url, params ) => Todos.request( 'POST', url, params );
	Todos.patch  = ( url, params ) => Todos.request( 'PATCH', url, params );
	Todos.delete = ( url, params ) => Todos.request( 'DELETE', url, params );

	return Todos;
}
