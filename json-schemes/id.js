const messages = require('../configs/messages');

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  $id: 'http://api.sudomoin-pavel-news-explorer.tk/schemas/id.json',
  type: 'string',
  minLength: 24,
  maxLength: 24,
  pattern: '^[a-fA-F0-9]*$',
  errorMessage: messages.validation.id.isNotObjectId,
};
