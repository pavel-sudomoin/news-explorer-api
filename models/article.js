const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Не указано ключевое слово'],
  },
  title: {
    type: String,
    required: [true, 'Не указан заголовок статьи'],
  },
  text: {
    type: String,
    required: [true, 'Не указан текст статьи'],
  },
  date: {
    type: String,
    required: [true, 'Не указана дата статьи'],
  },
  source: {
    type: String,
    required: [true, 'Не указан источник статьи'],
  },
  link: {
    type: String,
    validate: [validator.isURL, 'Некорректная ссылка на статью'],
    required: [true, 'Не указана ссылка на статью'],
  },
  image: {
    type: String,
    validate: [validator.isURL, 'Некорректная ссылка на иллюстрацию'],
    required: [true, 'Не указана ссылка на иллюстрацию'],
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
