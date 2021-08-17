const mongoose = require('mongoose');
require('../models/Engine');
const cars = require('../models/Car');
const engines = require('../models/Engine');


const url = 'mongodb://localhost:27017/carshistory';

const Service = {
  createNewCar: async carData => {
    await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    const engine = await engines.create(carData.engineData);
    carData.engineData = engine._id;
    return await cars.create(carData);
  },
  findCarsOwnedBy: async ownerId => {
    await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    return await cars.find({owner: ownerId}).exec();
  },
  findCarByOwnerAndId: async (ownerId, carId) => {
    await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    return await cars.findOne({owner: ownerId, _id: carId}).populate('engineData').exec();
  },
  addServiceEntry: async (ownerId, vin, data) => {
    await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    return await cars.updateOne(
      {vin, owner: ownerId},
      {$push: {serviceHistory: data}}
    ).exec();
  }
};

module.exports = Service;
