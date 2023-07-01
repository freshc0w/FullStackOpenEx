import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getNotes, createNote, updateNote } from './requests';

const App = () => {
	const queryClient = useQueryClient();

	// Use mutation params take in request and then any config
	const newNoteMutation = useMutation(createNote, {
		onSuccess: newNote => {
			// on success, render up-to-date state on the server
			// queryClient.invalidateQueries('notes');

			// manually updating the query state:
			const notes = queryClient.getQueryData('notes');
			queryClient.setQueryData('notes', notes.concat(newNote));
		},
	});
	const updateNoteMutation = useMutation(updateNote, {
		onSuccess: () => {
			queryClient.invalidateQueries('notes');
		},
	});

	const addNote = async event => {
		event.preventDefault();
		const content = event.target.note.value;
		event.target.note.value = '';
		newNoteMutation.mutate({ content, important: true });
	};

	const result = useQuery('notes', getNotes, {
		// optional:
		// refetchOnWindowFocus: false,
	});

	if (result.isLoading) return <div>loading data...</div>;

	const notes = result.data;

	const toggleImportance = note => {
		updateNoteMutation.mutate({ ...note, important: !note.important });
	};

	return (
		<div>
			<h2>Notes app</h2>
			<form onSubmit={addNote}>
				<input name="note" />
				<button type="submit">add</button>
			</form>
			{notes.map(note => (
				<li
					key={note.id}
					onClick={() => toggleImportance(note)}
				>
					{note.content}
					<strong> {note.important ? 'important' : ''}</strong>
				</li>
			))}
		</div>
	);
};

export default App;
