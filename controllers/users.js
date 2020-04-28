const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { JwtTokenKey } = require('../config/config');

const BadRequesError = require('../errors/bad-request-error');
const UnauthorizedError = require('../errors/unauthorized-error');

function addCookieToResponse(res, user) {
  const token = jwt.sign(
    { _id: user._id },
    JwtTokenKey,
    { expiresIn: '7d' },
  );
  res
    .status(200)
    .cookie('jwt', token, { maxAge: 604800000, httpOnly: true, sameSite: true });
}

function usersPasswordHandler(pass) {
  if (!pass) {
    throw new BadRequesError('user validation failed: password: Не указан пароль');
  }
  if (pass.length < 8) {
    throw new BadRequesError('user validation failed: password: Пароль должен быть не короче 8 символов');
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
      res.status(201).send(user);
    })
    .catch((err) => {
      res.clearCookie('jwt');
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new BadRequesError('user validation failed: email: Уже существует пользователь с данным email'));
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
      res.status(200).send({ message: 'Вы успешно авторизованы' });
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
        throw new UnauthorizedError('Необходима авторизация');
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      res.clearCookie('jwt');
      next(err);
    });
};
