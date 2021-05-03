const App = require('express')();
const express = require('express');
// const path = require('path');
const cors = require('cors');
// const logger = require('morgan');
require('dotenv').config();

// DATABASE CONNECTION.
require('./Database')();

// App.use(logger('dev'));
App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(cors());

// App.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
//   res.header('Access-Control-Allow-Headers', '*');
//   next();
// });

// ROUTES IMPORTS
const { BlogsRoute, EventsRoute, ReviewsRoute } = require('./Routes');

// ROUTES MIDDLEWARE CONNECTORS
App.use('/api/blogs', BlogsRoute);
App.use('/api/events', EventsRoute);
App.use('/api/reviews', ReviewsRoute);

module.exports = App;
