'use strict';

const athMovilApi = require('../../lib/ath-movil-api');
const httpErrorResponses = require('../../lib/http/error-responses.json');

exports.request = function (req, res) {
  const token = req.body.token;
  const phone = req.body.phone;
  const amount = req.body.amount;

  if (!token || !phone || !amount) {
    return res.status(403).json({
      error: httpErrorResponses.bad_request
    });
  }

  athMovilApi.requestPayment(token, phone, amount, function (apiResponse) {
    return res.status(200).json({
      reference_number: apiResponse.referenceNumber,
      phone: apiResponse.phone,
      amount: apiResponse.amount,
      status: apiResponse.status
    });
  });
};

exports.status = function (req, res) {
  const token = req.body.token;
  const referenceNumber = req.body.reference_number;

  if (!token || !referenceNumber) {
    return res.status(403).json({
      error: httpErrorResponses.bad_request
    });
  }

  athMovilApi.verifyService(token, referenceNumber, function (apiResponse) {
    return res.status(200).json({
      reference_number: apiResponse.referenceNumber,
      phone: apiResponse.phone,
      amount: apiResponse.amount,
      status: apiResponse.status
    });
  });
};