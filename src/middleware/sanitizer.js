'use strict';

const validator = require('validator');

module.exports = function (req, res, next) {

  // sanitize request body 
  for (const param in req.body) {
    req.body[param] = validator.blacklist(req.body[param], '$');
  }

  // sanitize request headers
  for (const header in req.headers) {
    req.headers[header] = validator.blacklist(req.headers[header], '$');
  }

  next();
};