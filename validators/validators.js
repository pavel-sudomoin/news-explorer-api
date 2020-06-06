const BadRequesError = require('../errors/bad-request-error');
const {
  idValidate,
} = require('./compiled-schemes.js');

function showErrorMessages(errors) {
  return errors.reduce((sum, current) => `${sum}${current.message}, `, '').slice(0, -2);
}

function validator(next, data, validate) {
  const valid = validate(data);
  if (!valid) next(new BadRequesError(showErrorMessages(validate.errors)));
  next();
}

module.exports.bodyValidator = (validate) => (req, res, next) => {
  validator(next, req.body, validate);
};

module.exports.idValidator = (req, res, next) => {
  validator(next, req.params.id, idValidate);
};
