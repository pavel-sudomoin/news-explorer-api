module.exports = {
  JWT_TOKEN: process.env.NODE_ENV === 'production' ? process.env.JWT_TOKEN : 'dev-secret',
};
