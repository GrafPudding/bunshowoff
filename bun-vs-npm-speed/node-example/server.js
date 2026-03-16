// Node.js HTTP Server - requires express, helmet, cors, morgan, etc.
// npm install express lodash axios moment dotenv cors helmet morgan body-parser compression joi winston

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const _ = require('lodash');
const moment = require('moment');
const axios = require('axios');
const Joi = require('joi');
const winston = require('winston');
require('dotenv').config();

const app = express();
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()]
});

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(compression());

const schema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required()
});

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Node.js!',
    timestamp: moment().format(),
    version: process.version,
    lodashTest: _.pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])
  });
});

app.post('/api/users', async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  try {
    const response = await axios.get('https://api.github.com/users');
    res.json({ user: req.body, externalData: response.data.length });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Node.js server running on port ${PORT}`);
});

// To run: node server.js
// To watch: npm run dev (uses nodemon)