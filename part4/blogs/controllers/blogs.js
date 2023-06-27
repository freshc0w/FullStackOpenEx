const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', {
		username: 1,
		name: 1,
	});
	res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id);
	blog ? res.json(blog) : res.status(404).end();
});

// authorization config
const getTokenFrom = req => {
	const authorization = req.get('authorization');

	return authorization && authorization.startsWith('Bearer ')
		? authorization.replace('Bearer ', '')
		: null;
};

blogsRouter.post('/', async (req, res) => {
	const body = req.body;

	const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
	if (!decodedToken.id)
		return res.status(401).json({ error: 'token invalid' });

	// Find the user by it's id and track the creator of the blog thru the creation of the blog json's info
	const user = await User.findById(decodedToken.id);

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user.id,
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();

	res.json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
	await Blog.findByIdAndRemove(req.params.id);
	res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
	const body = req.body;

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url || 'url not provided',
		likes: body.likes,
	};

	await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
	res.json(blog);
});

module.exports = blogsRouter;
