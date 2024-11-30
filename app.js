const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');

const blogRouter = require('./controllers/blog');
const middlewear = require('./utils/middlewear');

logger.info('Connecting to ', config.MONGODB_URI);

mongoose.set('strictQuery', false);

mongoose.connect(config.MONGODB_URI).then(() => {
  logger.info('Connected to MongoDB');
}).catch((error) => {
	logger.error('error connecting to MongoDB: ', error.message);
})

app.use(cors());
app.use(express.json());
app.use(middlewear.requestLogger);

app.use('/api/blogs', blogRouter);

app.use(middlewear.unknownEndpoint);
app.use(middlewear.errorHandler);


module.exports = app;