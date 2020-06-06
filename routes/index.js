const router = require('express').Router();

const auth = require('../middlewares/auth');
const articles = require('./articles.js');
const users = require('./users.js');
const wrongRequests = require('./wrong-requests.js');

const { login, createUser, logout } = require('../controllers/users.js');
const { loginValidate, userValidate } = require('../validators/compiled-schemes');
const { bodyValidator } = require('../validators/validators');

router.post('/signin', bodyValidator(loginValidate), login);
router.post('/signup', bodyValidator(userValidate), createUser);
router.post('/logout', logout);
router.use('/articles', auth, articles);
router.use('/users', auth, users);
router.use('*', wrongRequests);

module.exports = router;
