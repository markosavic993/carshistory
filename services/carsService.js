const mongoose = require('mongoose');
require('../models/Engine');
const cars = require('../models/Car');


const url = 'mongodb://localhost:27017/carshistory';

const Service = {
  findCarsOwnedBy: async ownerId => {
    await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    return await cars.find({owner: ownerId}).populate('engineData').exec();
  }
};

module.exports = Service;
