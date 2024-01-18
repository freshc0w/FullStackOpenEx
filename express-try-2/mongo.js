const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log('give password as argument');
	process.exit(1);
}


const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
	content: String,
	date: Date,
	important: Boolean,
});
console.log(url)

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
	content: 'HTML is easy',
	important: true,
});
