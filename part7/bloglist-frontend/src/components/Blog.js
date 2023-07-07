import { useState } from 'react';
import { Link } from 'react-router-dom';

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
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
			handleRemoveBlog(blog.id.toString());
		}
	};

	return (
		<div className='blog' style={blogStyle}>
			<Link to={`blogs/${blog.id}`}>{currBlog.title} by {currBlog.author}</Link>
			<button className='clkBtn' onClick={() => setVisible(!visible)}>
				{visible ? 'hide' : 'view'}
			</button>
			<div className='togglableContent' style={{ display: visible ? '' : 'none' }}>
				{currBlog.url}
				<br />
				likes {currBlog.likes || 0}{' '}
				<button className='likeBtn' onClick={updateBlog}>like</button>
				<br />
				<button className='removeBtn' onClick={removeBlog}>remove</button>
			</div>
		</div>
	);
};

export default Blog;
