const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
	{
		title: 'The Art of Storytelling',
		author: 'Emily Johnson',
		url: 'https://www.example.com/the-art-of-storytelling',
		likes: 256,
	},
	{
		title: 'Exploring the Wonders of Nature',
		author: 'Michael Anderson',
		url: 'https://www.example.com/exploring-the-wonders-of-nature',
		likes: 128,
	},
	{
		title: 'Mastering the Basics of Photography',
		author: 'Sarah Thompson',
		url: 'https://www.example.com/mastering-the-basics-of-photography',
		likes: 512,
	},
	{
		title: 'Healthy Living: A Holistic Approach',
		author: 'David Miller',
		url: 'https://www.example.com/healthy-living-a-holistic-approach',
		likes: 384,
	},
];

const nonExistingId = async () => {
	const blog = new Blog({ title: 'Will be removed' });
	await blog.save();
	await blog.deleteOne();

	return blog._id.toString();
};

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map(user => user.toJSON());
};

module.exports = {
	initialBlogs,
	nonExistingId,
	blogsInDb,
	usersInDb,
};
