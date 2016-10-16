'use strict';

const shortid = require('shortid');
const athMovilApi = require('../../lib/ath-movil-api');
const httpErrorResponses = require('../../lib/http/error-responses.json');

const Business = require('../db/models/business');

exports.authenticate = function (req, res) {
  const businessUsername = req.body.username;
  const businessPassword = req.body.password;

  if (!businessUsername || !businessPassword) {
    return res.status(403).json({
      error: httpErrorResponses.bad_request
    });
  }

  athMovilApi.requestSession(businessUsername, businessPassword, function (err, apiResponse) {
    if (err) {
      return res.status(403).json({
        error: httpErrorResponses.authentication_failed
      });
    }

    let business = new Business({
      _id: shortid.generate(),
      payments: [],
      clients: []
    });

    business.save(function (err) {
      if (err) {
        return res.status(500).json({
          error: httpErrorResponses.business_profile_not_created
        });
      }

      return res.status(200).json({
        business_id: business._id,
        token: apiResponse.token,
        exp_date: apiResponse.expDate
      });
    });
  });
};