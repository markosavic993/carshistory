require('../models/Engine');
const cars = require('../models/Car');
const engines = require('../models/Engine');


const Service = {
  createNewCar: async carData => {
    const engine = await engines.create(carData.engineData);
    carData.engineData = engine._id;
    return await cars.create(carData);
  },
  findCarsOwnedBy: async ownerId => {
    return await cars.find({owner: ownerId}).exec();
  },
  findCarByOwnerAndId: async (ownerId, carId) => {
    return await cars.findOne({owner: ownerId, _id: carId}).populate('engineData').exec();
  },
  addServiceEntry: async (ownerId, carId, data) => {
    return await cars.updateOne(
      {_id: carId, owner: ownerId},
      {$push: {serviceHistory: data}}
    ).exec();
  }
};

module.exports = Service;
