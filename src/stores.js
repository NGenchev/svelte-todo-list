import { writable } from 'svelte/store'

export const Todos = writable( [
	{
		id: 1,
		title: "First Example Thing",
		content: "This is the first element, just for testing purposes.",
		isDone: false,
	},
	{
		id: 2,
		title: "Second Example Thing",
		content: "This is the second element, just for testing purposes.",
		isDone: true,
	},
	{
		id: 3,
		title: "Third Example Thing",
		content: "This is the third element, just for testing purposes.",
		isDone: true,
	},
	{
		id: 4,
		title: "Fourth Example Thing",
		content: "This is the fourth and longest element from the store, just for testing purposes in the svelte application.",
		isDone: false,
	}
] );