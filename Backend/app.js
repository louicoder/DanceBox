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

let users = [];
let votes = [];

io.on('connection', (socket) => {
  socket.on('join server', (usr) => {
    // socket.to('server', { users });
    users = [ ...users, { ...usr.user, socket: socket.id } ];
    io.emit('new user', users);
  });

  socket.on('vote', (usr) => {
    votes = [ ...votes, usr ];
    io.emit('new vote', votes);
  });

  socket.on('disconnect', (args) => {
    console.log('Socket disconnected', args);
    users = users.filter((usr) => usr.socket !== socket.id);
    io.emit('new user', users);
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
const { BlogsRoute, EventsRoute, ReviewsRoute, AccountsRoute, CommentsRoute, TestingRoute } = require('./Routes');

// ROUTES MIDDLEWARE CONNECTORS
app.use('/api/blogs', BlogsRoute);
app.use('/api/events', EventsRoute);
app.use('/api/reviews', ReviewsRoute);
app.use('/api/accounts', AccountsRoute);
app.use('/api/comments', CommentsRoute);
app.use('/api/testing', TestingRoute);

// app.post('/api/resize', async (req, res) => {
//   try {
//     const axios = require('axios');
//     // tinify.key = 'TbYdNVKRmMw3fCgTJ2kNj25nkxzKNzY8';
//     // console.log('BASE 64----', req.body);
//     // tinify
//     //   .fromBuffer(req.body.image)
//     //   .resize({
//     //     method: 'fit',
//     //     width: 500,
//     //     height: 500
//     //   })
//     //   .toBuffer((error, data) => {
//     //     if (error) return res.json({ success: false, result: error });
//     //     return res.json({ success: true, result: data });
//     //   });

//     await axios
//       .post(
//         'https://api.tinify.com/shrink',
//         { source: { data: req.body.image } },
//         {
//           headers: {
//             Authorization: 'Basic YXBpOlRiWWROVktSbU13M2ZDZ1RKMmtOajI1bmt4ektOelk4',
//             'Content-Type': 'application/json'
//           }
//         }
//       )
//       .then((resp) => res.json({ success: true, result: resp }));
//   } catch (error) {
//     console.log('Error here', error.message);
//   }
// });

module.exports = server;
