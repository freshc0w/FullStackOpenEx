const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
		minlength: 5
	},
	important: Boolean,
})

noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Note', noteSchema);









/* PART 2-3

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose
	.connect(url)
	.then(res => {
		console.log('connected to MongoDB');
	})
	.catch(err => {
		console.log('error connecting to MongoDB:', err.message);
	});

const noteSchema = new mongoose.Schema({
	// Mongoose validation
	content: {
		type: String,
		minLength: 5,
		required: true
	},
	important: Boolean,
});

// Need to set a valid id for the frontend and also mongo versioning
// field __v
noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Note', noteSchema);
*/