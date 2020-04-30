const mongoose = require('mongoose');
const validator = require('validator');

const messages = require('../configs/messages');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, messages.validation.article.keyword.isRequired],
  },
  title: {
    type: String,
    required: [true, messages.validation.article.title.isRequired],
  },
  text: {
    type: String,
    required: [true, messages.validation.article.text.isRequired],
  },
  date: {
    type: String,
    required: [true, messages.validation.article.date.isRequired],
  },
  source: {
    type: String,
    required: [true, messages.validation.article.source.isRequired],
  },
  link: {
    type: String,
    validate: [validator.isURL, messages.validation.article.link.isNotUrl],
    required: [true, messages.validation.article.link.isRequired],
  },
  image: {
    type: String,
    validate: [validator.isURL, messages.validation.article.image.isNotUrl],
    required: [true, messages.validation.article.image.isRequired],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    select: false,
    ref: 'user',
    required: true,
  },
});

function showOnlyWhiteListFields(doc, ret) {
  const retJson = {
    keyword: ret.keyword,
    title: ret.title,
    text: ret.text,
    date: ret.date,
    source: ret.source,
    link: ret.link,
    image: ret.image,
    _id: ret._id,
  };
  return retJson;
}

articleSchema.set('toJSON', { transform: showOnlyWhiteListFields });

module.exports = mongoose.model('article', articleSchema);
