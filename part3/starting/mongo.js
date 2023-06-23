const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log('give password as argument');
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://freshc0w:${password}@fullstackopenex.ki7wocb.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
	content: 'CSS is HARD!',
	important: false,
});

// Generating new notes and saving it to db
// note.save().then(result => {
// 	console.log('note saved!');
// 	mongoose.connection.close();
// });

// Fetching objects from db
// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note);
//     })
//     mongoose.connection.close();
// })

// Fetching only important notes
Note.find({ important: true }).then(result =>{
    result.forEach(n => {
        console.log(n);
    })
    mongoose.connection.close();
})