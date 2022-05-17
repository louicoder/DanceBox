const express = require('express');
// const express = require('express');
const app = express();
const server = require('http').createServer(app);
require('dotenv').config();

const io = require('socket.io')(server, {
  cors: {
    origin: '*'
    // Headers: []
  }
});

let users = [];
let votes = [];
// let partcipants = [];
let rooms = [];
let participants = [];
let mainRooms = {};
// let server = [];

io.on('connection', (socket) => {
  socket.on('join-server', (usr) => {
    console.log('Joined server', socket.id);
    socket.join('server');
    const userObj = { socket: socket.id, ...usr };
    if (rooms.indexOf(usr.room) === -1) rooms.push(usr.room);
    if (users.map((u) => u.deviceId).indexOf(usr.deviceId) === -1) users.push(userObj);
    // console.log('USERS server', users);
    // const parts = participants.filter((u) => u.room === usr.room);

    // const userz = users.filter((u) => u.room === usr.room);
    // const votez = votes.filter((v) => v.room === usr.room);

    // io.to(usr.room).emit('update', { users: userz, participants: parts });
    io.to('server').emit('joined-server', users);
    // socket.to('server').emit('joined-server', usr);
  });

  socket.on('join-room', ({ roomId, uid }) => {
    socket.join(roomId);
    if (mainRooms[roomId]) mainRooms[roomId] = [ ...mainRooms[roomId], uid ];
    else mainRooms[roomId] = [ uid ];
    io.to(roomId).emit('new-user', mainRooms[roomId]);
  });

  // io.of('/').adapter.on('delete-room', (room) => {
  //   console.log(`room ${room} was created`);
  // });

  // socket.on('create-room', (room) => {
  //   io.of('/').adapter.on('create-room', (room) => {
  //     console.log(`room ${room} was created`);
  //   });
  // });

  socket.on('add-participant', (usr) => {
    console.log('LEAVING ROOM--------', usr);
    participants.push({ ...usr, votes: [] });
    const parts = participants.filter((u) => u.room === usr.room);
    const userz = users.filter((u) => u.room === usr.room);
    io.to(usr.room).emit('update', { participants: parts, users: userz });
    const votez = votes.filter((v) => v.room === usr.room);
    io.to(usr.room).emit('new-votes', votez);
    // usr.callback();
  });

  socket.on('remove-participant', (usr) => {
    participants = participants.filter((p) => p.id !== usr.id);
    const parts = participants.filter((p) => p.room === usr.room);
    const userz = users.filter((u) => u.room === usr.room);
    const votez = votes.filter((v) => v.room === usr.room);
    io.to(usr.room).emit('update', { participants: parts, users: userz });
    io.to(usr.room).emit('new-votes', votez);
  });

  socket.on('leave-room', ({ uid, roomId }) => {
    mainRooms[roomId] = mainRooms[roomId] && mainRooms[roomId].filter((r) => r !== uid);
    io.to(roomId).emit('new-user', mainRooms[roomId]);
  });

  socket.on('vote', (usr) => {
    console.log('Voting', usr);
    // participants.map(r => r.id === usr.voted ? ({ ...r, votes: [...r.votes, usr.voter] }) : r);
    votes.push(usr);
    const votez = votes.filter((v) => v.room === usr.room);
    io.to(usr.room).emit('new-votes', votez);
  });

  socket.on('disconnect', (args) => {
    console.log('Socket disconnected', socket.rooms.size);
    // users = users.filter((r) => r.socket !== socket.id);
    // io.
    // io.to('server').emit('joined-server', users);

    // users = users.filter((usr) => usr.id !== socket.id);
    // io.to('server').emit('new-user', users);
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
const {
  BlogsRoute,
  EventsRoute,
  ReviewsRoute,
  AccountsRoute,
  CommentsRoute,
  TestingRoute,
  PostsRoute
} = require('./Routes');

// ROUTES MIDDLEWARE CONNECTORS
app.use('/api/blogs', BlogsRoute);
app.use('/api/posts', PostsRoute);
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

module.exports = { server };
