'use strict';

const httpErrorResponses = require('../../lib/http/error-responses.json');

module.exports = function (req, res) {
  res.status(404).json({
    error: httpErrorResponses.not_found
  });
};