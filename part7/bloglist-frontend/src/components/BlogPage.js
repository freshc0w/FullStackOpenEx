import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { likeBlog } from '../reducers/blogReducer';
import {
	setNotifStatus,
	setNotification,
} from '../reducers/notificationReducer';

const BlogPage = () => {
	// Assume there is an id in the params
	const id = useParams().id;
	const dispatch = useDispatch();
	const blogs = useSelector(({ blogs }) => blogs);
	const blog = blogs.find(b => b.id === id);
	if (!blog) return null;

	const addLikeBlog = blog => {
		dispatch(likeBlog(blog.id));
		dispatch(setNotifStatus(true));
		dispatch(setNotification(`You liked ${blog.title}`, 5000));
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
			{blog.comments.length ? (
				blog.comments.map(c => <li key={c.id}>{c.content}</li>)
			) : (
				<p>No comments yet</p>
			)}
		</>
	);
};

export default BlogPage;
