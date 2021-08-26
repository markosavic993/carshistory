const service = require('../services/carsService');

const Controller = {
  findCarsForUser: async () => {
    return {cars: await service.findCarsOwnedBy('6100166ae330e04aad617900')};
  },
  findCarById: async (params) => {
    const { carId } = params;
    return await service.findCarByOwnerAndId('6100166ae330e04aad617900', carId);
  },
  addServiceHistoryEntry: async (params, payload) => {
    const { carId } = params;
    await service.addServiceEntry('6100166ae330e04aad617900', carId, {
      date: payload.date,
      mileage: payload.mileage,
      serviceType: payload.serviceType,
      description: payload.description
    });
    return {message: `Service history entry created for ${carId}`};
  },
  insertNewCar: async (payload) => {
    return await service.createNewCar({
      vin: payload.vin,
      name: `${payload.make} ${payload.model}`,
      images: [],
      productionYear: payload.productionYear,
      color: payload.color,
      countryOrigin: payload.country,
      transmission: payload.transmission,
      mileage: payload.mileage,
      engineData: payload.engine,
      owner: '6100166ae330e04aad617900',
      serviceHistory: []
    });
  },
  removeServiceHistoryEntry: async (params) => {
    const { carId, serviceHistoryId } = params;
    return await service.deleteServiceEntry('6100166ae330e04aad617900', carId, serviceHistoryId)
  },
  deleteSingleCar: async (params) => {
    const { carId } = params;
    return await service.deleteCarByOwnerAndId('6100166ae330e04aad617900', carId)
  }
};

module.exports = Controller;
