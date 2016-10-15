'use strict';

const url = require('url');
const express = require('express');
const mongoose = require('mongoose');

const server = express();

/* Server Configuration */
const serverConfig = require('../config/server.config')();

const db = require('../config/database.config')[serverConfig.env];

/* Database Connection */
mongoose.connect(db.uri, db.options, function (err) {
  if (err) {
    throw new Error(
      'Connection to database server `' +
      url.parse(db.uri).host + '` failed');
  } else {
    console.log(
      'Connection to database server `' +
      url.parse(db.uri).host + '` was successful\n');
  }
});

/* Initiate API routes */
require('./routes/routes.js')(server);

/* Set the server host address and port */
server.set('port', serverConfig.port);
server.set('host', serverConfig.host);

module.exports = server;