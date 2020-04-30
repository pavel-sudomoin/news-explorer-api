const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { JWT_TOKEN } = require('../configs/token-key');
const messages = require('../configs/messages');
const UnauthorizedError = require('../errors/unauthorized-error');

module.exports = async (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    if (!token) {
      throw new UnauthorizedError(messages.authorization.isRequired);
    }
    payload = jwt.verify(token, JWT_TOKEN);
    const user = await User.findById(payload._id);
    if (!user) {
      throw new UnauthorizedError(messages.authorization.isRequired);
    }
  } catch (err) {
    res.clearCookie('jwt');
    next(err);
  }
  req.user = payload;
  next();
};
