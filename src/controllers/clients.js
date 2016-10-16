'use strict';

const httpErrorResponses = require('../../lib/http/error-responses.json');
const Business = require('../db/models/business');

exports.getClients = function (req, res, next) {
  const businessId = req.body.business_id;

  if (!businessId) {
    return res.status(403).json({
      error: httpErrorResponses.bad_request
    });
  }

  Business.findOne({ _id: businessId }, function (err, business) {
    if (err) {
      return next(err);
    }

    if (!business) {
      return res.status(404).json({
        error: httpErrorResponses.business_not_found
      });
    }

    return res.status(200).json({
      clients: business.clients
    });
  });
};