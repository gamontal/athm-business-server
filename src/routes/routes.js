'use strict';

const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

module.exports = function (server) {
  const router = express.Router();

  /* Controllers */
  const indexController = require('../controllers/index');
  const authController = require('../controllers/auth');
  const paymentsController = require('../controllers/payments');
  //todo const clientsController = require('../controllers/clients');
  //todo const transactionsController = require('../controllers/transactions');

  /* Middleware */
  const sanitizer = require('../middleware/sanitizer');
  const notFound = require('../middleware/not-found');

  server.use(helmet());
  server.use(bodyParser.urlencoded({ extended: true }));

  router.route('/')
    .get(indexController);
  router.route('/auth')
    .post(authController.authenticate);
  router.route('/payments/request')
    .post(paymentsController.request);
  router.route('/payments/status')
    .post(paymentsController.status);
  router.use(sanitizer);

  server.use('/api', router);
  server.use('*', notFound); // catch 404 status codes
};