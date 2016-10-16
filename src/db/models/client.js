'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name: { type: String, required: true, index: { unique: true } },
  phone: { type: String, required: true }
});

if (!ClientSchema.options.toObject) { ClientSchema.options.toObject = {}; }
ClientSchema.options.toObject.transform = function (doc, ret) {
  delete ret._id;
  delete ret.__v;

  return ret;
};

module.exports = mongoose.model('Client', ClientSchema);