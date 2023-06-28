import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification'
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [errorMessage, setNotifMessage] = useState(null);
	const [errorStatus, setErrorStatus] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	const blogFormRef = useRef();

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

	const handleAddBlog = async (newBlogObj) => {
		blogFormRef.current.toggleVisibility();
		const blog = await blogService.create(newBlogObj);
		setBlogs(blogs.concat(blog));

		setErrorStatus(false);
		setNotifMessage(`A new blog - ${newBlogObj.title} by ${newBlogObj.author}`);

		setTimeout(() => {
			setNotifMessage(null);
		}, 5000);
	};

	const addBlogForm = () => (
		<Togglable buttonLabel='new blog' ref={blogFormRef}>
			<BlogForm createBlog={handleAddBlog} setNotifMessage={setNotifMessage}/>
		</Togglable>
	)

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