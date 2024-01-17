const express = require('express');
const app = express();
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

app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (req, res) => {
	res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
	const id = Number(req.params.id);
	const note = notes.find(note => note.id === id);
	note ? res.json(note) : res.status(404).end();
});

app.delete('/api/notes/:id', (req, res) => {
	const id = Number(req.params.id);
	notes = notes.filter(note => note.id !== id);

	res.status(204).end();
});

app.post('/api/notes', (req, res) => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0

	const note = req.body;
  note.id = maxId + 1
  notes = notes.concat(note);

	console.log(note);
	res.json(note);
});

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method);
  console.log('Path:  ', req.path);
  console.log('Body:  ', req.body);
  console.log('---');
  next();
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(requestLogger);
app.use(unknownEndpoint);


const PORT = 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
