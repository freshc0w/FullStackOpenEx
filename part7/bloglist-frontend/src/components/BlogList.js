import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { likeBlog, removeBlog, initialiseBlogs } from '../reducers/blogReducer';
import {
	setNotification,
	setNotifStatus,
} from '../reducers/notificationReducer';

import Blog from './Blog';

const BlogList = () => {
	const dispatch = useDispatch();
	const blogs = useSelector(({ blogs }) => {
		return blogs;
	});

	useEffect(() => {
		dispatch(initialiseBlogs());
	}, [dispatch]);

	const addLikeBlog = blog => {
		dispatch(likeBlog(blog.id));

		// Display success notification
		dispatch(setNotifStatus(true));
		dispatch(setNotification(`You liked ${blog.title}`, 5000));
	};

	const removeOneBlog = blog => {
		dispatch(removeBlog(blog.id));

		dispatch(setNotifStatus(true));
		dispatch(setNotification(`You removed ${blog.title}`, 5000));
	};

	return (
		<div>
			<h2>blogs</h2>
			{[...blogs]
				.sort((a, b) => b.likes - a.likes)
				.map(blog => (
					<Blog
						key={blog.id}
						blog={blog}
						handleUpdateBlog={() => addLikeBlog(blog)}
						handleRemoveBlog={() => removeOneBlog(blog)}
					/>
				))}
		</div>
	);
};

export default BlogList;