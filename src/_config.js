var config = {};

config.mongoURI = {
  test: 'mongodb://localhost/reddit-clone-testing',
  development: 'mongodb://localhost/reddit-clone',
  production: process.env.MONGODB_URI
};

// config.SALT_WORK_FACTOR = {
//   test: 10,
//   development: 10,
//   production: 12,
// };

config.SECRET_KEY = '\x1e\xa9\x96fV\xbbfK\xbc\xec\xe6V-7\x15\xd7\x91J\n\x7f\xd8\xf6+\xba';

config.SALT_WORK_FACTOR = 10;


module.exports = config;
