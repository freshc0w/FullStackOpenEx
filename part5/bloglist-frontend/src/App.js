import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const Notification = ({ errorStatus, message }) => {
	const errorStyle = {
		color: 'red',
		background: 'lightgrey',
		fontSize: '20px',
		borderStyle: 'solid',
		borderRadius: '5px',
		padding: '10px',
		marginBottom: '10px',
	};

	const successStyle = {
		color: 'green',
		background: 'lightgrey',
		fontSize: '20px',
		borderStyle: 'solid',
		borderRadius: '5px',
		padding: '10px',
		marginBottom: '10px',
	};

	if (message === null) return null;

	return <div style={errorStatus ? errorStyle : successStyle}>{message}</div>;
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
	const [errorMessage, setNotifMessage] = useState(null);
	const [errorStatus, setErrorStatus] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	const [blogTitle, setBlogTitle] = useState('');
	const [blogAuthor, setBlogAuthor] = useState('');
	const [blogUrl, setBlogUrl] = useState('');

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
      setErrorStatus(true);
			setNotifMessage('wrong username or password');

			setTimeout(() => {
				setNotifMessage(null);
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

	const handleAddBlog = async e => {
		e.preventDefault();

		const newBlogObj = {
			title: blogTitle,
			author: blogAuthor,
			url: blogUrl,
		};

		const blog = await blogService.create(newBlogObj);
    setErrorStatus(false);
    setNotifMessage(`A new blog - ${blogTitle} by ${blogAuthor}`);
		setBlogs(blogs.concat(blog));
		setBlogTitle('');
		setBlogAuthor('');
		setBlogUrl('');

    setTimeout(() => {
      setNotifMessage(null);
    }, 5000)
	};
	const addBlogForm = () => (
		<form onSubmit={handleAddBlog}>
			<div>
				title:
				<input
					type="text"
					value={blogTitle}
					onChange={({ target }) => setBlogTitle(target.value)}
				/>
			</div>
			<div>
				author:
				<input
					type="text"
					value={blogAuthor}
					onChange={({ target }) => setBlogAuthor(target.value)}
				/>
			</div>
			<div>
				url:
				<input
					type="text"
					value={blogUrl}
					onChange={({ target }) => setBlogUrl(target.value)}
				/>
			</div>
			<button type="submit">Create</button>
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
			<Notification
				errorStatus={errorStatus}
				message={errorMessage}
			/>
			{!user && loginForm()}
			{user && (
				<div>
					<p>
						{user.name} logged in
						<button onClick={handleLogOut}>logout</button>
					</p>
					<h1>create New</h1>
					{addBlogForm()}
					{blogsInfo()}
				</div>
			)}
		</>
	);
};

export default App;
