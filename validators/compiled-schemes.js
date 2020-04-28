const Ajv = require('ajv');
const { isEmail } = require('validator');

const articleSheme = require('../json-schemes/article');
const userSheme = require('../json-schemes/user');
const loginSheme = require('../json-schemes/login');
const idSheme = require('../json-schemes/id');

const ajv = new Ajv({
  schemas:
    [
      articleSheme,
      userSheme,
      loginSheme,
      idSheme,
    ],
  format: 'full',
}).addFormat('email', isEmail);

module.exports.articleValidate = ajv.getSchema('http://api.sudomoin-pavel-news-explorer.tk/schemas/article.json');
module.exports.userValidate = ajv.getSchema('http://api.sudomoin-pavel-news-explorer.tk/schemas/user.json');
module.exports.loginValidate = ajv.getSchema('http://api.sudomoin-pavel-news-explorer.tk/schemas/login.json');
module.exports.idValidate = ajv.getSchema('http://api.sudomoin-pavel-news-explorer.tk/schemas/id.json');
module.exports.ajv = ajv;
