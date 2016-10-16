'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommerceSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});

if (!CommerceSchema.options.toObject) { CommerceSchema.options.toObject = {}; }
CommerceSchema.options.toObject.transform = function (doc, ret) {
  delete ret._id;
  delete ret.__v;

  return ret;
};

module.exports = mongoose.model('Commerce', CommerceSchema);