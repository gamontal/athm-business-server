'use strict';

const moment = require('moment');
const athMovilApi = require('../../lib/ath-movil-api');
const httpErrorResponses = require('../../lib/http/error-responses.json');
const Business = require('../db/models/business');

exports.request = function (req, res, next) {
  const token = req.body.token;
  const businessId = req.body.business_id;
  const phone = req.body.phone;
  const amount = req.body.amount;

  if (!token || !businessId || !phone || !amount) {
    return res.status(403).json({
      error: httpErrorResponses.bad_request
    });
  }

  athMovilApi.requestPayment(token, phone, amount, function (err, apiResponse) {
    if (err) {
      return res.status(403).json({
        error: httpErrorResponses.payment_not_sent
      });
    }

    const payment = {
      create_time: moment().format('MMM Do YY'),
      reference_number: apiResponse.referenceNumber,
      client: {
        phone: apiResponse.phone,
        avatar: 'http://res.cloudinary.com/dvicgeltx/image/upload/v1457705095/img4_pnpgsg.jpg' // for tests
      },
      amount: apiResponse.amount
    };

    const client = {
      phone: phone
    };

    Business.findOne({ _id: businessId }, function (err, business) {
      if (err) {
        return next(err);
      }

      if (!business) {
        return res.status(404).json({
          error: httpErrorResponses.business_not_found
        });
      }

      business.transactions.push(payment);
      business.clients.push(client);
      business.save(function (err) {
        if (err) {
          res.status(500).json({
            error: httpErrorResponses.payment_not_registered
          });
        }

        return res.status(200).json({
          create_time: payment.create_time,
          reference_number: apiResponse.referenceNumber,
          phone: apiResponse.phone,
          amount: apiResponse.amount,
          status: apiResponse.status
        });
      });
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

  athMovilApi.verifyService(token, referenceNumber, function (err, apiResponse) {
    if (err) {
      return res.status(403).json({
        error: httpErrorResponses.payment_not_verified
      });
    }

    return res.status(200).json({
      reference_number: apiResponse.referenceNumber,
      phone: apiResponse.phone,
      amount: apiResponse.amount,
      status: apiResponse.status
    });
  });
};