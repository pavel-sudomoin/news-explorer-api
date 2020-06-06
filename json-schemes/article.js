const messages = require('../configs/messages');

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  $id: 'http://api.sudomoin-pavel-news-explorer.tk/schemas/article.json',
  type: 'object',
  properties: {
    keyword: { type: 'string' },
    title: { type: 'string' },
    text: { type: 'string' },
    date: { type: 'string' },
    source: { type: 'string' },
    link: { type: 'string', format: 'url' },
    image: { type: 'string', format: 'url' },
  },
  required: ['keyword', 'title', 'text', 'date', 'source', 'link', 'image'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      keyword: messages.validation.article.keyword.isWrongType,
      title: messages.validation.article.title.isWrongType,
      text: messages.validation.article.text.isWrongType,
      date: messages.validation.article.date.isWrongType,
      source: messages.validation.article.source.isWrongType,
      link: messages.validation.article.link.isNotUrl,
      image: messages.validation.article.image.isNotUrl,
    },
    required: {
      keyword: messages.validation.article.keyword.isRequired,
      title: messages.validation.article.title.isRequired,
      text: messages.validation.article.text.isRequired,
      date: messages.validation.article.date.isRequired,
      source: messages.validation.article.source.isRequired,
      link: messages.validation.article.link.isRequired,
      image: messages.validation.article.image.isRequired,
    },
    additionalProperties: messages.validation.bodyFormat.isAdditionalProperties,
  },
};
