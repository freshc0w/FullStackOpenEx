import Note from './components/Note';
import { useState, useEffect } from 'react';
import axios from 'axios';
import noteService from './services/notes';
import loginService from './services/login';
import Notification from './components/Notification';

const Footer = () => {
	const footerStyle = {
		color: 'green',
		fontStyle: 'italic',
		fontSize: 16,
	};
	return (
		<div style={footerStyle}>
			<br />
			<em>
				Note App, Department of Computer Science, University of Helsinki
				2022
			</em>
		</div>
	);
};

const App = props => {
	const [notes, setNotes] = useState(null);
	const [newNote, setNewNote] = useState('a new note...');
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	
	// Get data and set data to state
	useEffect(() => {
		noteService.getAll().then(initialNotes => {
			setNotes(initialNotes);
		});
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
		if(loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			noteService.setToken(user.token);
		}
	}, []);

	const handleLogin = async e => {
		e.preventDefault();
		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem(
				'loggedNoteappUser', JSON.stringify(user)
			)
			noteService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (err) {
			setErrorMessage('Wrong credentials');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	);

	const noteForm = () => (
		<form onSubmit={addNote}>
			<input
				value={newNote}
				onChange={handleNoteChange}
			/>
			<button type="submit">save</button>
		</form>
	);

	if (!notes) return null;

	const toggleImportanceOf = id => {
		const note = notes.find(n => n.id === id);
		const changedNote = { ...note, important: !note.important };

		noteService
			.update(id, changedNote)
			.then(returnedNote => {
				setNotes(
					notes.map(note => (note.id !== id ? note : returnedNote))
				);
			})
			.catch(err => {
				setErrorMessage(
					`the note '${note.content}' was already deleted from the server`
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
				setNotes(notes.filter(n => n.id !== id));
			});
	};

	const addNote = e => {
		e.preventDefault();

		const newNoteObj = {
			content: newNote,
			important: Math.random() < 0.5,
			id: notes.length + 1,
		};

		noteService.create(newNoteObj).then(returnedNote => {
			setNotes(notes.concat(returnedNote));
			setNewNote('');
		});
	};

	const handleNoteChange = e => {
		setNewNote(e.target.value);
	};

	const notesToShow = showAll ? notes : notes.filter(note => note.important);

	return (
		<div>
			<h1>Notes</h1>
			<Notification message={errorMessage} />

			{/* Don't display notes if user is not logged in */}
			{/* {user === null ? loginForm() : noteForm()} */}

			{!user && loginForm()}
			{user && (
				<div>
					<p>{user.name} logged in</p>
					{noteForm()}
				</div>
			)}

			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all'}
				</button>
			</div>
			<ul>
				{notesToShow.map(note => (
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				))}
			</ul>
			<Footer />
		</div>
	);
};

export default App;
