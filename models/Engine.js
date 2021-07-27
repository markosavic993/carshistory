const mongoose = require('mongoose');

const enginesSchema = new mongoose.Schema({
  name: String,
  engineType: String,
  power: Number,
  volume: Number
});

module.exports = mongoose.model('Engine', enginesSchema);
