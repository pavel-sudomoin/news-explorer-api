module.exports = {
  JwtTokenKey: process.env.NODE_ENV === 'production' ? process.env.JWT_TOKEN : 'dev-secret',
};
