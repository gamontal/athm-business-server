'use strict';

const athMovilApi = require('../../lib/ath-movil-api');
const httpErrorResponses = require('../../lib/http/error-responses.json');

exports.authenticate = function (req, res) {
  const commUsername = req.body.username;
  const commPassword = req.body.password;

  if (!commUsername || !commPassword) {
    return res.status(403).json({
      error: httpErrorResponses.bad_request
    });
  }

  athMovilApi.requestSession(commUsername, commPassword, function (err, apiResponse) {
    if (err) {
      return res.status(403).json({
        error: httpErrorResponses.authentication_failed
      });
    }

    return res.status(200).json({
      token: apiResponse.token,
      exp_date: apiResponse.expDate
    });
  });
};