const config = require('./utils/config');
require('express-async-errors');
const express = require('express');
const app = express();

const cors = require('cors');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const middleware = require('./utils/middleware');
const morgan = require('morgan');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

// MONGODB
mongoose.set('strictQuery', false);
const url = process.env.MONGODB_URI;
logger.info('connecting to', url);
mongoose
	.connect(url)
	.then(res => {
		logger.info('connected to MongoDB');
	})
	.catch(error => {
		logger.info('error connecting to MongoDB:', error.message);
	});

app.use(cors());
// app.use(express.static('build));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(morgan(middleware.reqMorganLogger));

app.use(middleware.tokensExtractor);

app.use('/api/blogs', middleware.userExtractor, blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/testing');
	app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
