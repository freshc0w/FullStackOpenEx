import { useState, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import {
	setNotification,
	setNotifStatus,
} from '../reducers/notificationReducer';

import Togglable from './Togglable';

const BlogForm = () => {
	const [blogTitle, setBlogTitle] = useState('');
	const [blogAuthor, setBlogAuthor] = useState('');
	const [blogUrl, setBlogUrl] = useState('');

	const dispatch = useDispatch();

	const blogFormRef = useRef();

	// const createBlog = async newBlogObj => {
	// };

	const addBlog = e => {
		e.preventDefault();

		const newBlogObj = {
			title: blogTitle,
			author: blogAuthor,
			url: blogUrl,
			likes: 0,
		};

		blogFormRef.current.toggleVisibility();

		// add set the blogs to current blogs state
		dispatch(createBlog(newBlogObj));

		// Update notification for 5s accordingly.
		dispatch(setNotifStatus(true));
		dispatch(
			setNotification(
				`A new blog - ${newBlogObj.title} by ${newBlogObj.author}`,
				5000
			)
		);

		setBlogTitle('');
		setBlogAuthor('');
		setBlogUrl('');
	};

	return (
		<Togglable
			buttonLabel="new blog"
			ref={blogFormRef}
		>
			<form onSubmit={addBlog}>
				<div>
					title:
					<input
						id="title-input"
						type="text"
						value={blogTitle}
						onChange={({ target }) => setBlogTitle(target.value)}
					/>
				</div>
				<div>
					author:
					<input
						id="author-input"
						type="text"
						value={blogAuthor}
						onChange={({ target }) => setBlogAuthor(target.value)}
					/>
				</div>
				<div>
					url:
					<input
						id="url-input"
						type="text"
						value={blogUrl}
						onChange={({ target }) => setBlogUrl(target.value)}
					/>
				</div>
				<button
					id="submit-blog"
					type="submit"
				>
					Create
				</button>
			</form>
		</Togglable>
	);
};

// BlogForm.propTypes = {
// 	createBlog: PropTypes.func.isRequired,
// };

export default BlogForm;
