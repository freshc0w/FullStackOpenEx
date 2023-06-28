import { useState, useEffect } from 'react';

const Blog = ({ blog, handleUpdateBlog, handleRemoveBlog }) => {
	const [visible, setVisible] = useState(false);
	const [currBlog, setCurrBlog] = useState(blog);

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid 1px',
		marginBottom: 5,
	};

	const updateBlog = () => {
		const newBlogObj = {
			...blog,
			likes: (currBlog.likes || 0) + 1,
		};
		setCurrBlog(newBlogObj);
		handleUpdateBlog(newBlogObj);
	};

	const removeBlog = () => {
		if (window.confirm(`Remove blog ${blog.name} by ${blog.author}?`)) {
			handleRemoveBlog(blog.id.toString());
		}
	};

	return (
		<div style={blogStyle}>
			{currBlog.title}{' '}
			<button onClick={() => setVisible(!visible)}>
				{visible ? 'hide' : 'view'}
			</button>
			<div style={{ display: visible ? '' : 'none' }}>
				{currBlog.url}
				<br />
				likes {currBlog.likes || 0}{' '}
				<button onClick={updateBlog}>like</button>
				<br />
				{currBlog.author}
				<br />
				<button onClick={removeBlog}>remove</button>
			</div>
		</div>
	);
};

export default Blog;
