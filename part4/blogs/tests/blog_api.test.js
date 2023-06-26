const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);

// FOR USER TESTS
const bcrypt = require('bcrypt');
const User = require('../models/user');

const helper = require('./test_helper');

const Blog = require('../models/blog');
// const { describe } = require('node:test');
const baseUrl = '/api/blogs';

beforeEach(async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(helper.initialBlogs);
});

describe('when there is initially some blogs saved', () => {
	test('blogs are returned as JSON', async () => {
		await api
			.get(baseUrl)
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('all blogs are returned', async () => {
		const response = await api.get(baseUrl);

		expect(response.body).toHaveLength(helper.initialBlogs.length);
	});

	test('a specific blog is within the returned blogs', async () => {
		const response = await api.get(baseUrl);

		const blogTitles = response.body.map(b => b.title);

		expect(blogTitles).toContain('Exploring the Wonders of Nature');
	});
});

describe('viewing a specific blog', () => {
	test('succeeds with a valid id', async () => {
		const blogAtStart = await helper.blogsInDb();
		const blogToView = blogAtStart[0];

		const resultBlog = await api
			.get(`${baseUrl}/${blogToView.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		expect(resultBlog.body).toEqual(blogToView);
	});

	test('fails with statuscode 404 if blog does not exist', async () => {
		const validNonExistingId = await helper.nonExistingId();

		await api.get(`${baseUrl}/${validNonExistingId}`).expect(404);
	});

	test('fails with statuscode 400 if id is invalid', async () => {
		const invalidId = '5a3d5da59070081a82a3445';

		await api.get(`${baseUrl}/${invalidId}`).expect(400);
	});
});

describe('addition of a new blog', () => {
	test('succeeds with valid data', async () => {
		const newBlog = {
			title: 'The Power of Positive Thinking',
			author: 'Sophia Roberts',
			url: 'https://www.example.com/the-power-of-positive-thinking',
			likes: 742,
		};

		await api
			.post(baseUrl)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

		const blogTitles = blogsAtEnd.map(b => b.title);
		expect(blogTitles).toContain('The Power of Positive Thinking');
	});
});

describe('deletion of a blog', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToDelete = blogsAtStart[0];

		await api.delete(`${baseUrl}/${blogToDelete.id}`).expect(204);

		const blogAtEnd = await helper.blogsInDb();
		expect(blogAtEnd).toHaveLength(helper.initialBlogs.length - 1);

		const blogTitles = blogAtEnd.map(b => b.title);

		expect(blogTitles).not.toContain(blogToDelete.title);
	});
});

describe('updating a blog', () => {
	test('succeeds with valid data', async () => {
		const updatedBlog = {
			title: 'The Power of Positive Thinking',
			author: 'Sophia Roberts',
			url: 'https://www.example.com/the-power-of-positive-thinking',
			likes: 742,
		};

		const blogAtStart = await helper.blogsInDb();
		const blogToUpdate = blogAtStart[0];
		expect(blogToUpdate.likes).toEqual(256);

		await api
			.put(`${baseUrl}/${blogToUpdate.id}`)
			.send(updatedBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd[0].id).toEqual(blogToUpdate.id);

		const blogLikes = blogsAtEnd.map(b => b.likes);
		expect(blogLikes[0]).toEqual(742);
	});
});

// user tests
describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash('sekret', 10);
		const user = new User({ username: 'root', passwordHash });
		await user.save();

	});
    test('creation succeeeds with a fresh username', async () => {
        const userAtStart = await helper.usersInDb();

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(userAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });
});

afterAll(async () => {
	await mongoose.connection.close();
});
