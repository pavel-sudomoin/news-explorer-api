const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { JWT_TOKEN } = require('../configs/token-key');
const messages = require('../configs/messages');
const BadRequesError = require('../errors/bad-request-error');
const UnauthorizedError = require('../errors/unauthorized-error');

function addCookieToResponse(res, user) {
  const token = jwt.sign(
    { _id: user._id },
    JWT_TOKEN,
    { expiresIn: '7d' },
  );
  res
    .status(200)
    .cookie('jwt', token, { maxAge: 604800000, httpOnly: true, sameSite: true });
}

function usersPasswordHandler(pass) {
  if (!pass) {
    throw new BadRequesError(messages.validation.user.password.isRequired);
  }
  if (pass.length < 8) {
    throw new BadRequesError(messages.validation.user.password.isShort);
  }
  return bcrypt.hash(pass, 10);
}

module.exports.createUser = (req, res, next) => {
  usersPasswordHandler(req.body.password)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.clearCookie('jwt');
      res.status(201).send(user);
    })
    .catch((err) => {
      res.clearCookie('jwt');
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new BadRequesError(messages.registration.isNotUniqueEmail));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      addCookieToResponse(res, user);
      res.status(200).send({ message: messages.authorization.isSuccess });
    })
    .catch((err) => {
      res.clearCookie('jwt');
      next(err);
    });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(messages.authorization.isRequired);
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      res.clearCookie('jwt');
      next(err);
    });
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).send({ message: messages.logout.isSuccess });
};
