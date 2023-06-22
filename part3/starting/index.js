const express = require('express');
const app = express();

// for RECEIVING DATA: POST
app.use(express.json());

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

app.get('/api/notes', (request, response) => {
	response.json(notes);
});

// Fetching a single resource
app.get('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id); // need to convert params to num first.
	const note = notes.find(note => note.id === id);

	note ? response.json(note) : response.status(404).end();
});

// Deleting a resource
app.delete('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id);
	notes = notes.filter(note => note.id !== id);
	response.status(204).end();
});

// Configuring a new id based on the length of notes
const generateId = () => {
	const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
    return maxId + 1;
};

// Receiving resources/data
app.post('/api/notes', (request, response) => {
    const body = request.body;

    // If no content was found in the body, generate 404 bad request.
    if(!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId(),
    }

	// Add to object
	notes = notes.concat(note);

	response.json(note);
});

// Configuration
const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`);
});
