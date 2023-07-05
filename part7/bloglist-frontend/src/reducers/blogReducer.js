import { createSlice } from '@reduxjs/toolkit';
import blogServices from '../services/blogs';

const initialState = [];

const blogSlice = createSlice({
	name: 'blogs',
	initialState,
	reducers: {
		setBlogs(state, action) {
			return action.payload;
		},
		appendBlog(state, action) {
			state.push(action.payload);
		},
		updateBlog(state, action) {
			const changedBlog = action.payload;
			return state.map(blog =>
				blog.id !== changedBlog.id ? blog : changedBlog
			);
		},
	},
});

export const { setBlogs, appendBlog, updateBlog } = blogSlice.actions;

export const initialiseBlogs = () => {
	return async dispatch => {
		const blogs = await blogServices.getAll();
		dispatch(setBlogs(blogs));
	};
};

export const createBlog = newBlogObj => {
	return async dispatch => {
		const newBlog = await blogServices.create(newBlogObj);
		dispatch(appendBlog(newBlog));
	};
};

export const likeBlog = id => {
	return async dispatch => {
		const blogs = await blogServices.getAll();
		const blogToChange = blogs.find(b => b.id === id);
		const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 };
		await blogServices.update(id, changedBlog);
		dispatch(updateBlog(changedBlog));
	};
};

export const removeBlog = id => {
	return async dispatch => {
		const blogs = await blogServices.getAll();
		await blogServices.removeBlog(id);
		dispatch(setBlogs(blogs.filter(b => b.id !== id)));
	};
};

export default blogSlice.reducer;
