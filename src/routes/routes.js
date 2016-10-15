'use strict';

const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

module.exports = function (server) {
  const router = express.Router();

  /* Controllers */
  const indexController = require('../controllers/index');

  /* Middleware */
  const sanitizer = require('../middleware/sanitizer');
  const notFound = require('../middleware/not-found');

  server.use(helmet());
  server.use(bodyParser.urlencoded({ extended: true }));

  router.route('/')
    .get(indexController);

  router.use(sanitizer);

  server.use('/api', router);
  server.use('*', notFound); // catch 404 status codes
};