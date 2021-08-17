const service = require('../services/carsService');

const Controller = {
  findCarsForUser: async () => {
    return {cars: await service.findCarsOwnedBy('6100166ae330e04aad617900')};
  },
  findCarById: async (params) => {
    const { carId } = params;
    return await service.findCarByOwnerAndId('6100166ae330e04aad617900', carId);
  },
  addServiceHistoryEntry: async (payload) => {
    await service.addServiceEntry('6100166ae330e04aad617900', payload.vin, {
      date: payload.date,
      mileage: payload.mileage,
      serviceType: payload.serviceType,
      description: payload.description
    });
    return {message: `Service history entry created for ${payload.vin}`};
  },
  insertNewCar: async (payload) => {
    return await service.createNewCar({
      vin: payload.vin,
      name: `${payload.make} ${payload.model}`,
      images: [],
      color: payload.color,
      countryOrigin: payload.country,
      transmission: payload.transmission,
      mileage: payload.mileage,
      engineData: payload.engine,
      owner: '6100166ae330e04aad617900',
      serviceHistory: []
    });
  }
};

module.exports = Controller;
