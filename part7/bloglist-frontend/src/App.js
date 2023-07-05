import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialiseBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';

import blogService from './services/blogs';
import loginService from './services/login';

import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';

const App = () => {
	const [blogs, setBlogs] = useState([]);

	const user = useSelector(({ user }) => user);

	const blogFormRef = useRef();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initialiseBlogs());
	}, [dispatch]);

	const handleAddBlog = async newBlogObj => {
		blogFormRef.current.toggleVisibility();
		const blog = await blogService.create(newBlogObj);
		setBlogs(blogs.concat(blog));

		// setErrorStatus(false);
		// setNotifMessage(
		// 	`A new blog - ${newBlogObj.title} by ${newBlogObj.author}`
		// );

		// setTimeout(() => {
		// 	setNotifMessage(null);
		// }, 5000);
	};

	const addBlogForm = () => (
		<Togglable
			buttonLabel="new blog"
			ref={blogFormRef}
		>
			<BlogForm
				createBlog={handleAddBlog}
				// setNotifMessage={setNotifMessage}
			/>
		</Togglable>
	);

	const handleLogOut = () => {
		window.localStorage.removeItem('loggedBlogappUser');
		dispatch(setUser(null));
	};

	return (
		<>
			<h1>Blogs</h1>
			<Notification />
			{!user && <LoginForm />}
			{user && (
				<div>
					<p>
						{user.name} logged in
						<button onClick={handleLogOut}>logout</button>
					</p>
					<h1>create New</h1>
					{addBlogForm()}
					<BlogList />
				</div>
			)}
		</>
	);
};

export default App;
