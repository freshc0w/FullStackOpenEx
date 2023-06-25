const config = require('./utils/config');

const express = require('express');
const app = express();

const cors = require('cors');

const notesRouter = require('./controllers/blogs');

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
    })


app.use(cors());
// app.use(express.static('build));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(morgan(middleware.reqMorganLogger));

app.use('/api/blogs', notesRouter);

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;