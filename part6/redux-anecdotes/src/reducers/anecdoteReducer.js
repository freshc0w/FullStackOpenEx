import { createSlice } from '@reduxjs/toolkit';
import anecServices from '../services/anecdotes';

const anecdotesAtStart = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = anecdote => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0,
	};
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	// with db.json, initialise empty arr as state
	initialState: [],
	reducers: {
		// votes and return all anecs
		voteOnce(state, action) {
			const changedAnecdote = action.payload;
			return state.map(anec =>
				anec.id !== changedAnecdote.id ? anec : changedAnecdote
			);
		},
		// createAnec(state, action) {
		// 	// const content = action.payload;
		// 	// state.push(asObject(content));
		// 	state.push(action.payload);
		// },
		appendAnec(state, action) {
			state.push(action.payload);
		},
		setAnecs(state, action) {
			return action.payload;
		},
	},
});

export const { voteOnce, appendAnec, setAnecs } = anecdoteSlice.actions;

export const initialiseAnecs = () => {
	return async dispatch => {
		const anecs = await anecServices.getAll();
		dispatch(setAnecs(anecs));
	};
};

export const createAnec = content => {
	return async dispatch => {
		const newAnec = await anecServices.createNew(content);
		dispatch(appendAnec(newAnec));
	};
};

export const voteAnecdote = id => {
	return async dispatch => {
		const anecs = await anecServices.getAll();
		const anecToChange = anecs.find(a => a.id === id);
		const changedAnec = { ...anecToChange, votes: anecToChange.votes + 1 };
		await anecServices.update(id, changedAnec);
		dispatch(voteOnce(changedAnec));
	};
};

export default anecdoteSlice.reducer;

/*
const anecdoteReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'VOTE': {
			const id = action.payload.id;
			const anecToChange = state.find(a => a.id === id);
			const changedAnec = {
				...anecToChange,
				votes: anecToChange.votes + 1,
			};
			return state.map(anec => (anec.id !== id ? anec : changedAnec));
		}

		case 'NEW_ANECDOTE':
			return [...state, action.payload];

		default:
			return state;
	}
};

// action createors
export const voteOnce = id => {
	return {
		type: 'VOTE',
		payload: { id },
	};
};

export const createAnec = content => {
	return {
		type: 'NEW_ANECDOTE',
		payload: asObject(content),
	};
};

export default anecdoteReducer;
*/
