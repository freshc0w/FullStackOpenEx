import { useSelector, useDispatch } from 'react-redux';
import { voteOnce, createAnec } from './reducers/anecdoteReducer';

import { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import anecService from './services/anecdotes';
import { setAnecs } from './reducers/anecdoteReducer';
import { initialiseAnecs } from './reducers/anecdoteReducer';

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(initialiseAnecs());
	}, [dispatch]);

	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification />
			<Filter />
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	);
};

export default App;
