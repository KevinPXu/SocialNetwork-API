const { connect, connection } = require('mongoose');
//connection string to access the mongodb database
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/userDB';

  //remove deprecations messages
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//export the connection
module.exports = connection;
