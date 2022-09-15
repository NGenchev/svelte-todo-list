import { Todos } from './stores';

let $Todos = "";
const unsubscribe = Todos.subscribe( value => ( $Todos = value ) );

const checkExists = todoId => {
	return $Todos.find( todo => todo.id === todoId ) ? true : todoId;
}

const createNewId = () => {
	let maybeNextId = $Todos.length + 1;

	while ( checkExists( maybeNextId ) === true ) {
		maybeNextId++;
	}

	return maybeNextId;
}

export default createNewId;