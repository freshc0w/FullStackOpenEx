import { useState } from 'react';

const Blog = ({ blog }) => {
	const [visible, setVisible] = useState(false);

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid 1px',
		marginBottom: 5,
	};

	// set blog likes if none is found
	blog.likes = blog.likes || 0;

	return (
		<div style={blogStyle}>
      
			{blog.title}{' '}
			<button onClick={() => setVisible(!visible)}>
				{visible ? 'hide' : 'view'}
			</button>

			<div style={{ display: visible ? '' : 'none' }}>
				{blog.url}
				<br />
				likes {blog.likes} <button>like</button>
				<br />
				{blog.author}
			</div>
		</div>
	);
};

export default Blog;
