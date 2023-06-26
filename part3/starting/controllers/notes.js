const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');

notesRouter.get('/', async (req, res) => {
	const notes = await Note.find({}).populate('user', {
		username: 1,
		name: 1,
	});
	res.json(notes);
});

notesRouter.get('/:id', async (req, res) => {
	const note = await Note.findById(req.params.id);
	note ? res.json(note) : res.status(404).end();
});

notesRouter.post('/', async (req, res) => {
	const body = req.body;

	const user = await User.findById(body.userId);

	const note = new Note({
		content: body.content,
		important: body.important || false,
		user: user.id,
	});

	const savedNote = await note.save();

	// Concat the note to the collection of specified user's notes
	user.notes = user.notes.concat(savedNote._id);
	await user.save();

	res.json(savedNote);
});

notesRouter.delete('/:id', async (req, res) => {
	await Note.findByIdAndRemove(req.params.id);
	res.status(204).end();
});

notesRouter.put('/:id', (req, res, next) => {
	const body = req.body;

	const note = {
		content: body.content,
		important: body.important,
	};

	Note.findByIdAndUpdate(req.params.id, note, { new: true })
		.then(updatedNote => {
			res.json(updatedNote);
		})
		.catch(error => next(error));
});

module.exports = notesRouter;
