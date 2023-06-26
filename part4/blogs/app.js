const config = require('./utils/config');
require('express-async-errors');
const express = require('express');
const app = express();

const cors = require('cors');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');

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

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
