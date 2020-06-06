const databaseUrl = process.env.NODE_ENV === 'production' ? process.env.DATABASE : 'mongodb://localhost:27017/newsdb';
const databaseSettings = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
module.exports = { databaseUrl, databaseSettings };
