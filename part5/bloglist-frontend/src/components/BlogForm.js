import { useState } from "react";

const BlogForm = ({ createBlog }) => {
    const [blogTitle, setBlogTitle] = useState('');
	const [blogAuthor, setBlogAuthor] = useState('');
	const [blogUrl, setBlogUrl] = useState('');

    const addBlog = e => {
        e.preventDefault();

        createBlog({
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl,
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
					type="text"
					value={blogTitle}
					onChange={({ target }) => setBlogTitle(target.value)}
				/>
			</div>
			<div>
				author:
				<input
					type="text"
					value={blogAuthor}
					onChange={({ target }) => setBlogAuthor(target.value)}
				/>
			</div>
			<div>
				url:
				<input
					type="text"
					value={blogUrl}
					onChange={({ target }) => setBlogUrl(target.value)}
				/>
			</div>
			<button type="submit">Create</button>
		</form>
    )
}

export default BlogForm