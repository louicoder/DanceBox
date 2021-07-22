const express = require('express');
// const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
    // Headers: []
  }
});

io.on('connection', (socket) => {
  console.log('Socket connected', socket.id);

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  socket.on('message', (msg) => {
    console.log('Socket message', msg);
  });
});
// const path = require('path');
const cors = require('cors');
// const logger = require('morgan');
require('dotenv').config();

// DATABASE CONNECTION.
require('./Database')();

// app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
//   res.header('Access-Control-Allow-Headers', '*');
//   next();
// });

// ROUTES IMPORTS
const { BlogsRoute, EventsRoute, ReviewsRoute, AccountsRoute } = require('./Routes');

// ROUTES MIDDLEWARE CONNECTORS
app.use('/api/blogs', BlogsRoute);
app.use('/api/events', EventsRoute);
app.use('/api/reviews', ReviewsRoute);
app.use('/api/accounts', AccountsRoute);

module.exports = server;
