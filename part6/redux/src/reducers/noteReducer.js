import { createSlice } from '@reduxjs/toolkit';

const initialState = [
	{
		content: 'reducer defines how redux store works',
		important: true,
		id: 1,
	},
	{
		content: 'state of store can contain any data',
		important: false,
		id: 2,
	},
];

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const noteSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		createNote(state, action) {
			const content = action.payload;
			// can mutate state because redux toolkit uses Immer library
			state.push({
				content,
				important: false,
				id: generateId(),
			});
		},
		toggleImportanceOf(state, action) {
			const id = action.payload;
			const noteToChange = state.find(n => n.id === id);
			const changedNote = {
				...noteToChange,
				important: !noteToChange.important,
			};

			console.log(JSON.parse(JSON.stringify(state)));

			return state.map(note => (note.id !== id ? note : changedNote));
		},
	},
});

export const { createNote, toggleImportanceOf } = noteSlice.actions;
export default noteSlice.reducer;

/* 	Below's code is using the { createStore, combineReducers } way.
* 	The one on top is using the configureStore using redux toolkit (recommended) 
const noteReducer = (state = initialState, action) => {
	// if (action.type === 'NEW_NOTE') {
	// 	// this push is bad because it makes noteReducer not a pure fnc
	// 	// state.push(action.payload);
	// 	// return state;
	// 	return state.concat(action.payload)
	// }
	switch (action.type) {
		case 'NEW_NOTE':
			return [...state, action.payload];

		case 'TOGGLE_IMPORTANCE': {
			const id = action.payload.id;
			const noteToChange = state.find(n => n.id === id);
			const changedNote = {
				...noteToChange,
				important: !noteToChange.important,
			};
			return state.map(note => (note.id !== id ? note : changedNote));
		}

		default:
			return state;
	}
};

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

// action creators
export const createNote = content => {
	return {
		type: 'NEW_NOTE',
		payload: {
			content,
			important: false,
			id: generateId(),
		},
	};
};

export const toggleImportanceOf = id => {
	return {
		type: 'TOGGLE_IMPORTANCE',
		payload: { id },
	};
};

export default noteReducer;
*/
