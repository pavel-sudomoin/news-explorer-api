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
const NotFoundError = require('./errors/not-found-error');
const rateLimiter = require('./config/rate-limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT);

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());

app.use(cors());

/*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
*/

app.use(bodyParser.json());
app.use((err, req, res, next) => {
  if (err) next(new NotFoundError('Invalid Request data'));
  else next();
});

app.use(cookieParser());

app.use(rateLimiter);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', bodyValidator(loginValidate), login);
app.post('/signup', bodyValidator(userValidate), createUser);
app.use('/articles', auth, articles);
app.use('/users', auth, users);
app.use('*', wrongRequests);

app.use(errorLogger);

app.use(errorHandler);
