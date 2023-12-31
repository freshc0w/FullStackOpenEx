import { createNote, toggleImportanceOf } from './reducers/noteReducer';
import { useSelector, useDispatch } from 'react-redux';

import { useEffect } from 'react';
import NewNote from './components/NewNote';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';
import noteService from './services/notes';
import { setNotes } from './reducers/noteReducer';
import { initializeNotes } from './reducers/noteReducer';

const App = () => {
	const dispatch = useDispatch();
	// useEffect(() => {
	// 	noteService.getAll().then(notes => dispatch(setNotes(notes)));
	// }, [dispatch]);

	useEffect(() => {
		// Fetching is done in the reducer
		dispatch(initializeNotes());
	}, [dispatch]);

	return (
		<div>
			<NewNote />
			<VisibilityFilter />
			<Notes />
		</div>
	);
};

export default App;
