const messages = require('../configs/messages');

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  $id: 'http://api.sudomoin-pavel-news-explorer.tk/schemas/user.json',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 2,
      maxLength: 30,
      errorMessage: {
        type: messages.validation.user.name.isWrongType,
        minLength: messages.validation.user.name.isShort,
        maxLength: messages.validation.user.name.isLong,
      },
    },
    email: {
      type: 'string',
      format: 'email',
      errorMessage: {
        type: messages.validation.user.email.isNotEmail,
        format: messages.validation.user.email.isNotEmail,
      },
    },
    password: {
      type: 'string',
      minLength: 8,
      errorMessage: {
        type: messages.validation.user.password.isWrongType,
        minLength: messages.validation.user.password.isShort,
      },
    },
  },
  required: ['name', 'email', 'password'],
  additionalProperties: false,
  errorMessage: {
    required: {
      name: messages.validation.user.name.isRequired,
      email: messages.validation.user.email.isRequired,
      password: messages.validation.user.password.isRequired,
    },
    additionalProperties: messages.validation.bodyFormat.isAdditionalProperties,
  },
};
