// hide mongoDb url and port. To deploy this publicy, set
// MONGODB_URI in the environment variables to the url
require('dotenv').config();

// Express configuration
const express = require('express');
const app = express();

// CORS

// Connecting to mongodb (database)
const Note = require('./models/note');

/**
 * MIDDLEWARE
 */
// order of middleware matters !
const requestLogger = (request, response, next) => {
	console.log('Method:', request.method);
	console.log('Path:  ', request.path);
	console.log('Body:  ', request.body);
	console.log('---');
	next();
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		// Invalid params from mongoose validation schema
		return response.status(400).json({ error: error.message });
	}

	next(error);
};

// for RECEIVING DATA: POST
app.use(express.json());

// CORS policy
const cors = require('cors');
app.use(cors());

// static website from react build
app.use(express.static('build'));

let notes = [
	{
		id: 1,
		content: 'HTML is easy',
		important: true,
	},
	{
		id: 2,
		content: 'Browser can execute only JavaScript',
		important: false,
	},
	{
		id: 3,
		content: 'GET and POST are the most important methods of HTTP protocol',
		important: true,
	},
];

// const app = http.createServer((request, response) => {
// 	response.writeHead(200, { 'Content-Type': 'application/json' });
// 	response.end(JSON.stringify(notes));
// });

app.get('/', (request, response) => {
	response.send('<h1>Hello World!!</h1>');
});

// get all notes w/database (w/o would just be res.json()
app.get('/api/notes', (request, response) => {
	Note.find({}).then(notes => {
		response.json(notes);
	});
});

// Fetching a single resource
// (w/o DB)
/*
app.get('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id); // need to convert params to num first.
	const note = notes.find(note => note.id === id);

	note ? response.json(note) : response.status(404).end();
});
*/
// (w/ db)
app.get('/api/notes/:id', (req, res) => {
	// mongoose has a findById method
	Note.findById(req.params.id)
		.then(note => {
			// Need to check that the note with the id exists.
			// Note will return null if it doesn't
			note ? res.json(note) : res.status(404).end();
		})
		// THis error handling method is WITHOUT middleware
		// .catch(err => {
		// 	console.log(err);

		// 	// If id doesn't match MongoDB's format
		// 	res.status(400).send({ error: 'malformatted id' });
		// });

		// with middleware:
		.catch(err => next(err));
});

// Deleting a resource (W/O db)
/*
app.delete('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id);
	notes = notes.filter(note => note.id !== id);
	response.status(204).end();
});
*/

// Deleting a resource (WITH DB)
app.delete('/api/notes/:id', (req, res, next) => {
	Note.findByIdAndRemove(req.params.id)
		.then(result => {
			res.status(204).end();
		})
		.catch(err => next(err));
});

// Configuring a new id based on the length of notes
const generateId = () => {
	const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
	return maxId + 1;
};

// Receiving resources/data
// (OLD WAY w/o db)
/**
 app.post('/api/notes', (request, response) => {
	 const body = request.body;
 
	 // If no content was found in the body, generate 404 bad request.
	 if (!body.content) {
		 return response.status(400).json({
			 error: 'content missing',
		 });
	 }
 
	 const note = {
		 content: body.content,
		 important: body.important || false,
		 id: generateId(),
	 };
 
	 // Add to object
	 notes = notes.concat(note);
 
	 response.json(note);
 });
 */

// (new way with db)
app.post('/api/notes', (req, res, next) => {
	const body = req.body;

	if (body.content === undefined) {
		return res.status(400).json({ error: 'content missing' });
	}

	const note = new Note({
		content: body.content,
		important: body.important || false,
	});

	note.save()
		.then(savedNote => {
			res.json(savedNote);
		})
		.catch(error => next(error));
});

// Toggling importance of note (with db)
app.put('/api/notes/:id', (req, res, next) => {
	const { content, important } = req.body;

	// Normally we could've just declared a note variable and put it in
	// the params. But because we need to validate, destructuring is better
	Note.findByIdAndUpdate(
		req.params.id,
		{ content, important },
		{ new: true, runValidators: true, context: 'query' }
	)
		.then(updatedNote => {
			res.json(updatedNote);
		})
		.catch(err => next(err));
});

// last middlewares and order matters
app.use(unknownEndpoint);
app.use(errorHandler);

// Configuration
// const PORT = 3001;

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(process.env.PORT);
	console.log(`Server running on PORT ${PORT}`);
});
