const messages = require('../configs/messages');
const patterns = require('../configs/patterns');

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  $id: 'http://api.sudomoin-pavel-news-explorer.tk/schemas/user.json',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      pattern: patterns.name.source,
      errorMessage: {
        type: messages.validation.user.name.isWrongType,
        pattern: messages.validation.user.name.isWrongPattern,
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
      pattern: patterns.password.source,
      errorMessage: {
        type: messages.validation.user.password.isWrongType,
        pattern: messages.validation.user.password.isWrongPattern,
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
