require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');

const { login, createUser } = require('./controllers/users.js');
const { loginValidate, userValidate } = require('./validators/compiled-schemes');
const { bodyValidator } = require('./validators/validators');
const auth = require('./middlewares/auth.js');
const articles = require('./routes/articles.js');
const users = require('./routes/users.js');
const wrongRequests = require('./routes/wrong-requests.js');
const errorHandler = require('./middlewares/error-handler.js');
const rateLimiter = require('./configs/rate-limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { databaseUrl, databaseSettings } = require('./configs/database');

const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT);

mongoose.connect(databaseUrl, databaseSettings);

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(rateLimiter);
app.use(requestLogger);
app.post('/signin', bodyValidator(loginValidate), login);
app.post('/signup', bodyValidator(userValidate), createUser);
app.use('/articles', auth, articles);
app.use('/users', auth, users);
app.use('*', wrongRequests);
app.use(errorLogger);
app.use(errorHandler);
