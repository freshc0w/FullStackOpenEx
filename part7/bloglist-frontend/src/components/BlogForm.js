import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Togglable from './Togglable';

const BlogForm = ({ createBlog }) => {
    const [blogTitle, setBlogTitle] = useState('');
	const [blogAuthor, setBlogAuthor] = useState('');
	const [blogUrl, setBlogUrl] = useState('');

	const blogFormRef = useRef();

    const addBlog = e => {
        e.preventDefault();

        createBlog({
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl,
			likes: 0,
        })

        setBlogTitle('');
		setBlogAuthor('');
		setBlogUrl('');
    }

    return (
        <form onSubmit={addBlog}>
			<div>
				title:
				<input
					id='title-input'
					type="text"
					value={blogTitle}
					onChange={({ target }) => setBlogTitle(target.value)}
				/>
			</div>
			<div>
				author:
				<input
					id='author-input'
					type="text"
					value={blogAuthor}
					onChange={({ target }) => setBlogAuthor(target.value)}
				/>
			</div>
			<div>
				url:
				<input
					id='url-input'
					type="text"
					value={blogUrl}
					onChange={({ target }) => setBlogUrl(target.value)}
				/>
			</div>
			<button id='submit-blog' type="submit">Create</button>
		</form>
    )
}

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired,
}

export default BlogForm