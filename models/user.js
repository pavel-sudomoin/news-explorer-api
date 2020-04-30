const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const messages = require('../configs/messages');
const UnauthorizedError = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, messages.validation.user.name.isShort],
    maxlength: [30, messages.validation.user.name.isLong],
    required: [true, messages.validation.user.name.isRequired],
  },
  email: {
    type: String,
    validate: [validator.isEmail, messages.validation.user.email.isNotEmail],
    unique: true,
    required: [true, messages.validation.user.email.isRequired],
  },
  password: {
    type: String,
    select: false,
    required: [true, messages.validation.user.password.isRequired],
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(messages.authorization.isWrongData);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(messages.authorization.isWrongData);
          }
          return user;
        });
    });
};

function showOnlyWhiteListFields(doc, ret) {
  const retJson = {
    name: ret.name,
    email: ret.email,
  };
  return retJson;
}

userSchema.set('toJSON', { transform: showOnlyWhiteListFields });

module.exports = mongoose.model('user', userSchema);
