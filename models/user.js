const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UnauthorizedError = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Имя пользователя должно быть длиннее 2 символов'],
    maxlength: [30, 'Имя пользователя должно быть короче 30 символов'],
    required: [true, 'Не указано имя пользователя'],
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'Некорректный email'],
    unique: true,
    required: [true, 'Не указан email'],
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Не указан пароль'],
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

function showOnlyWhiteListFields(doc, ret) {
  const retJson = {
    name: ret.name,
    email: ret.email,
    _id: ret._id,
  };
  return retJson;
}

userSchema.set('toJSON', { transform: showOnlyWhiteListFields });

module.exports = mongoose.model('user', userSchema);
