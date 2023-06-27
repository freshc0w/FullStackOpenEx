import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const Notification = ({ message }) => {
	if (message === null) return null;

	return <div className="error">{message}</div>;
};

const Note = ({ note, toggleImportance }) => {
	const label = note.important ? 'make not important' : 'make important';
	return (
		<li className="note">
			{note.content}
			<button onClick={toggleImportance}>{label}</button>
		</li>
	);
};

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [newNote, setNewNote] = useState('a new note...');
	const [errorMessage, setErrorMessage] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	useEffect(() => {
		blogService.getAll().then(blogs => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
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
				'loggedBlogappUser',
				JSON.stringify(user)
			);
			blogService.setToken(user.token);

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

	const blogsInfo = () => (
		<div>
			<h2>blogs</h2>
			{blogs.map(blog => (
				<Blog
					key={blog.id}
					blog={blog}
				/>
			))}
		</div>
	);

	const handleLogOut = () => {
		window.localStorage.removeItem('loggedBlogappUser');
		setUser(null);
	};

	return (
		<>
			<h1>Blogs</h1>
			<Notification message={errorMessage} />
			{!user && loginForm()}
			{user && (
				<div>
					<p>
						{user.name} logged in
						<button onClick={handleLogOut}>logout</button>
					</p>
					{blogsInfo()}
				</div>
			)}
		</>
	);
};

export default App;
