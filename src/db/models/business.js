'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusinessSchema = new Schema({
  _id: { type: String },
  transactions: { type: Array },
  clients: { type: Array }
});

if (!BusinessSchema.options.toObject) { BusinessSchema.options.toObject = {}; }
BusinessSchema.options.toObject.transform = function (doc, ret) {
  delete ret._id;
  delete ret.__v;

  return ret;
};

module.exports = mongoose.model('businesses', BusinessSchema);