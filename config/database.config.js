'use strict';

const mongoose = require('mongoose');

// Use a custom mongoose promises library
mongoose.Promise = require('bluebird');

module.exports = {
  production: {
    uri: 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME,
    options: {
      server: { poolSize: 5 },
      user: process.env.DB_USER || '',
      pass: process.env.DB_PASS || ''
    }
  },
  development: {
    uri: 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME,
    options: {
      server: { poolSize: 5 },
      user: process.env.DB_USER || '',
      pass: process.env.DB_PASS || ''
    }
  },
  test: {
    uri: 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME,
    options: {
      server: { poolSize: 5 },
      user: process.env.DB_USER || '',
      pass: process.env.DB_PASS || ''
    }
  }
};