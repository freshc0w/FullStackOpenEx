import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/noteReducer';
import noteService from '../services/notes';

const NewNote = () => {
	const dispatch = useDispatch();

	const addNote = async e => {
		e.preventDefault();
		const content = e.target.note.value;
		e.target.note.value = '';
		// Fetching done in reducer fncs
		dispatch(createNote(content));
		// const newNote = await noteService.createNew(content);
		// dispatch(createNote(newNote));
	};

	return (
		<form onSubmit={addNote}>
			<input
				type="text"
				name="note"
			/>
			<button type="submit">add</button>
		</form>
	);
};

export default NewNote;
