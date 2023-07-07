const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const logger = require('../utils/logger');

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
// const getTokenFrom = req => {
// 	const authorization = req.get('authorization');

// 	return authorization && authorization.startsWith('Bearer ')
// 		? authorization.replace('Bearer ', '')
// 		: null;
// };

blogsRouter.post('/', async (req, res) => {
	const body = req.body;

	// req.token is from middleware
	// const decodedToken = jwt.verify(req.token, process.env.SECRET);
	// if (!decodedToken.id)
	// 	return res.status(401).json({ error: 'token invalid' });

	// Find the user by it's id and track the creator of the blog thru the creation of the blog json's info
	// get user from request object
	const user = req.user;

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user.id,
		comments: body.comments,
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();

	res.json(savedBlog);
});

// blogsRouter.delete('/:id', async (req, res) => {
// 	await Blog.findByIdAndRemove(req.params.id);
// 	res.status(204).end();
// });

blogsRouter.delete('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id);

	// get user from request object
	const user = req.user;
	// console.log('request: ', req)
	// console.log('user: ', user.toString())
	// console.log('user id', user.id.toString());

	if (blog.user.toString() === user.id.toString()) {
		await Blog.findByIdAndRemove(req.params.id);
		res.status(204).end();
	} else {
		return res.status(400).json({
			error: 'Cannot delete blog that was not created by logged in user.',
		});
	}
});

blogsRouter.put('/:id', async (req, res) => {
	const body = req.body;

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url || 'url not provided',
		likes: body.likes || 0,
	};

	await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
	res.json(blog);
});

// Adding comments
blogsRouter.get('/:id/comments', async (req, res) => {
	const blog = await Blog.findById(req.params.id);

	blog ? res.json(blog.comments) : res.status(404).end();
});

const generateId = () => Math.floor(Math.random() * 1000000);

blogsRouter.post('/:id/comments', async (req, res) => {
	const body = req.body;
	const content = body.content;
	const foundBlog = await Blog.findById(req.params.id);
	const updatedBlog = {
		...foundBlog._doc,
		comments: foundBlog.comments !== null
			? [...foundBlog.comments, {content, id: generateId()}]
			: [{content, id: generateId()}],
	};

	await Blog.findByIdAndUpdate(req.params.id, updatedBlog, { new: true });
	res.json(updatedBlog);
});

blogsRouter.delete('/:id/comments', async (req, res) => {
	const blog = await Blog.findById(req.params.id);
	const updatedBlog = {
		...blog._doc,
		comments: [],
	}
	await Blog.findByIdAndUpdate(req.params.id, updatedBlog, { new: true })
	res.json(updatedBlog)
})

module.exports = blogsRouter;
