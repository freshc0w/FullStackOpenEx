import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { likeBlog, addComment, initialiseBlogs } from '../reducers/blogReducer';
import {
	setNotifStatus,
	setNotification,
} from '../reducers/notificationReducer';

const BlogPage = () => {
	const [comment, setComment] = useState('');
	// Assume there is an id in the params
	const id = useParams().id;
	const dispatch = useDispatch();
	const blogs = useSelector(({ blogs }) => blogs);
	const blog = blogs.find(b => b.id === id);
	if (!blog) return null;

	useEffect(() => {
		// To refresh page.
		dispatch(initialiseBlogs());
	}, [blog.comments]);

	const addLikeBlog = blog => {
		dispatch(likeBlog(blog.id));
		dispatch(setNotifStatus(true));
		dispatch(setNotification(`You liked ${blog.title}`, 5000));
	};

	const addOneComment = e => {
		e.preventDefault();

		if (comment.trim() === '') {
			dispatch(setNotifStatus(false));
			dispatch(
				setNotification(
					'Please enter some content to your comment!',
					5000
				)
			);
			return null;
		}
		// The fetching and the handling is handled in teh dispatch fnc
		dispatch(addComment(blog.id, comment));
		dispatch(setNotifStatus(true));
		dispatch(
			setNotification(
				`Successfully added "${comment}" comment to the blog ${blog.title}`,
				5000
			)
		);
		setComment('');
	};

	return (
		<>
			<h1>{blog.title}</h1>
			<p>{blog.url}</p>
			<p>
				{blog.likes} likes{' '}
				<button onClick={() => addLikeBlog(blog)}>like</button>
			</p>
			<p>added by {blog.author}</p>

			<h3>Comments</h3>
			<form onSubmit={addOneComment}>
				<input
					type="text"
					placeholder="Enter a comment here"
					value={comment}
					onChange={e => setComment(e.target.value)}
				/>
				<button type="submit">Add comment</button>
			</form>
			{blog.comments.length ? (
				blog.comments.map(c => <li key={c.id}>{c.content}</li>)
			) : (
				<p>No comments yet</p>
			)}
		</>
	);
};

export default BlogPage;
