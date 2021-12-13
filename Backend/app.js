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
// let partcipants = [];
let rooms = [];
let participants = [];

io.on('connection', (socket) => {
  socket.on('join-server', (usr) => {
    socket.join(usr.room);
    const userObj = { socket: socket.id, id: usr.deviceId, room: usr.room };
    if (rooms.indexOf(usr.room) === -1) rooms.push(usr.room);
    if (users.map((u) => u.id).indexOf(socket.id) === -1) users.push(userObj);
    const parts = participants.filter((u) => u.room === usr.room);

    const userz = users.filter((u) => u.room === usr.room);
    const votez = votes.filter((v) => v.room === usr.room);

    io.to(usr.room).emit('update', { users: userz, participants: parts });
    io.to(usr.room).emit('new-votes', votez);
  });

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

  socket.on('leave-room', ({ deviceId, roomId }) => {
    socket.leave(roomId);
    rooms = rooms.filter((r) => r !== roomId);
    users = users.filter((u) => u.id !== deviceId);
    const userz = users.filter((u) => u.room === roomId);
    const parts = participants.filter((u) => u.room === roomId);
    io.to(roomId).emit('update', { users: userz, participants: parts });
    const votez = votes.filter((v) => v.room === roomId);
    io.to(roomId).emit('new-votes', votez);
    socket.disconnect();
  });

  socket.on('vote', (usr) => {
    console.log('Voting', usr);
    // participants.map(r => r.id === usr.voted ? ({ ...r, votes: [...r.votes, usr.voter] }) : r);
    votes.push(usr);
    const votez = votes.filter((v) => v.room === usr.room);
    io.to(usr.room).emit('new-votes', votez);
  });

  socket.on('disconnect', (args) => {
    console.log('Socket disconnected', args);
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
