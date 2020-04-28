const BadRequesError = require('../errors/bad-request-error');
const {
  ajv,
  idValidate,
} = require('./compiled-schemes.js');

function validator(next, data, validate) {
  const valid = validate(data);
  if (!valid) next(new BadRequesError(ajv.errorsText(validate.errors)));
  next();
}

module.exports.bodyValidator = (validate) => (req, res, next) => {
  validator(next, req.body, validate);
};

module.exports.idValidator = (req, res, next) => {
  validator(next, req.params.id, idValidate);
};
