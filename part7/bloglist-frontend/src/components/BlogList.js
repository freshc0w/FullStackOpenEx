import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, removeBlog, setBlogs } from '../reducers/blogReducer';
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

	const addLikeBlog = blog => {
		dispatch(likeBlog(blog.id));

        // Display success notification
		dispatch(setNotifStatus(true));
		dispatch(setNotification(`You liked ${blog.title}`, 5000));
	};

	const removeBlog = blog => {
		dispatch(removeBlog(blog.id));
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
						handleRemoveBlog={() => removeBlog(blog)}
					/>
				))}
		</div>
	);
};

export default BlogList;
