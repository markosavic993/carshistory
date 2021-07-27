const mongoose = require('mongoose');

const serviceHistorySchema = new mongoose.Schema({
  date: Date,
  mileage: Number,
  serviceType: String,
  description: String
});

const carsSchema = new mongoose.Schema({
  vin: String,
  name: String,
  productionYear: Number,
  images: [String],
  color: String,
  countryOrigin: String,
  transmission: String,
  mileage: Number,
  engineData: {type: mongoose.Schema.Types.ObjectId, ref: 'Engine'},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Owner'},
  serviceHistory: [serviceHistorySchema]
});

module.exports = mongoose.model('Car', carsSchema);
