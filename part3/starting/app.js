const config = require('./utils/config');
const express = require('express');
MONGODB_URI = mongodb+srv://freshc0w:jNMWw7bPjur1OLAa@clustor0.ox1vutg.mongodb.net/note?retryWrites=true&w=majority

TEST_MONGODB_URI = mongodb+srv://freshc0w:jNMWw7bPjur1OLAa@clustor0.ox1vutg.mongodb.net/testNoteApp?retryWrites=true&w=majority

PORT = 3001 
const app = express();
const cors = require('cors');
const notesRouter = require('./controllers/notes');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB');
	})
	.catch(error => {
		logger.error('error connecting to MongoDB', error.message);
	});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
