const messages = require('../configs/messages');

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  $id: 'http://api.sudomoin-pavel-news-explorer.tk/schemas/login.json',
  type: 'object',
  properties: {
    email: { $ref: 'user.json#/properties/email' },
    password: { $ref: 'user.json#/properties/password' },
  },
  required: ['email', 'password'],
  additionalProperties: false,
  errorMessage: {
    required: {
      email: messages.validation.user.email.isRequired,
      password: messages.validation.user.password.isRequired,
    },
    additionalProperties: messages.validation.bodyFormat.isAdditionalProperties,
  },
};
