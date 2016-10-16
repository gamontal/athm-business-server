'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  name: { type: String, required: true, index: { unique: true } }
});

if (!TransactionSchema.options.toObject) { TransactionSchema.options.toObject = {}; }
TransactionSchema.options.toObject.transform = function (doc, ret) {
  delete ret._id;
  delete ret.__v;

  return ret;
};

module.exports = mongoose.model('Transaction', TransactionSchema);