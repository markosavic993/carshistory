const mongoose = require('mongoose');

const ownersSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  emailAddress: String
});

module.exports = mongoose.model('Owner', ownersSchema);
