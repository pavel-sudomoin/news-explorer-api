require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');

const errorHandler = require('./middlewares/error-handler');
const bodyParserErrorHandler = require('./middlewares/body-parser-error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { databaseUrl, databaseSettings } = require('./configs/database');
const rateLimiter = require('./configs/rate-limiter');

const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT);

mongoose.connect(databaseUrl, databaseSettings);

app.use(helmet());
app.use(cors());
app.use(bodyParser.json(), bodyParserErrorHandler);
app.use(cookieParser());
app.use(rateLimiter);
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errorHandler);
