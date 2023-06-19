import Note from "./components/Note";
import { useState, useEffect } from "react";
import axios from "axios";
import noteService from "./services/notes";

const App = (props) => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState("a new note...");
	const [showAll, setShowAll] = useState(true);

	// Get data and set data to state
	useEffect(() => {
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes);
		});
	}, []);

	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };

		noteService
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(
					notes.map((note) => (note.id !== id ? note : returnedNote))
				);
			})
			.catch((err) => {
				alert(
					`the note '${note.content}' was already deleted from the server`
				);
				setNotes(notes.filter((n) => n.id !== id));
			});
	};

	const addNote = (e) => {
		e.preventDefault();

		const newNoteObj = {
			content: newNote,
			important: Math.random() < 0.5,
			id: notes.length + 1,
		};

		noteService.create(newNoteObj).then((returnedNote) => {
			setNotes(notes.concat(returnedNote));
			setNewNote("");
		});
	};

	const handleNoteChange = (e) => {
		setNewNote(e.target.value);
	};

	const notesToShow = showAll
		? notes
		: notes.filter((note) => note.important);

	return (
		<div>
			<h1>Notes</h1>
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? "important" : "all"}
				</button>
			</div>
			<ul>
				{notesToShow.map((note) => (
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				))}
			</ul>
			<form onSubmit={addNote}>
				<input
					value={newNote}
					onChange={handleNoteChange}
				/>
				<button type="submit">save</button>
			</form>
		</div>
	);
};

export default App;
