const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Note = require('../models/note');

const initialNotes = [
	{
		content: 'HTML is easy',
		important: false,
	},
	{
		content: 'Browser can execute only Javascript',
		important: true,
	},
];

beforeEach(async () => {
	// clear db
	await Note.deleteMany({});

	// add two notes
	let noteObject = new Note(initialNotes[0]);
	await noteObject.save();
	noteObject = new Note(initialNotes[1]);
	await noteObject.save();
});

test('notes are returned as json', async () => {
	await api
		.get('/api/notes')
		.expect(200)
		.expect('Content-type', /application\/json/);
});

test('all notes have returned', async () => {
	const response = await api.get('/api/notes');

	// Execution gets here only after the HTTP request is complete
	// the result of HTTP request is saved in variable response

	expect(response.body).toHaveLength(initialNotes.length);
});

test('a specific note is within the returned notes', async () => {
	const response = await api.get('/api/notes');

	const contents = response.body.map(r => r.content);
	expect(contents).toContain('Browser can execute only Javascript');
});

afterAll(async () => {
	await mongoose.connection.close();
});
