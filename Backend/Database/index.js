const mongoose = require('mongoose');
require('dotenv').config();

// dev
// DEV_DB_CONNECTION_STRING

// Prod
// DB_CONNECTION_STRING

// local

const connectWithRetry = () =>
  mongoose
    .connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => console.log(':::::::: CONNECTED TO DATBASE :::::::::'))
    .catch((error) => {
      console.log('RECONNECTING TO MONGODB DATABASE...', error);
      setTimeout(() => connectWithRetry(), 5000);
    });

module.exports = connectWithRetry;
