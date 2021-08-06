const service = require('../services/carsService');

const Controller = {
  findCarsForUser: async () => {
    return {cars: await service.findCarsOwnedBy('6100166ae330e04aad617900')};
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
};

module.exports = Controller;
