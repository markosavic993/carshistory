const service = require('../services/carsService');

const Controller = {
  findCarsForUser: async (user) => {
    return {cars: await service.findCarsOwnedBy(user._id)};
  },
  findCarById: async (params, user) => {
    const { carId } = params;
    return await service.findCarByOwnerAndId(user._id, carId);
  },
  addServiceHistoryEntry: async (params, payload, user) => {
    const { carId } = params;
    await service.addServiceEntry(user._id, carId, {
      date: payload.date,
      mileage: payload.mileage,
      serviceType: payload.serviceType,
      description: payload.description
    });
    return {message: `Service history entry created for ${carId}`};
  },
  insertNewCar: async (payload, user) => {
    return await service.createNewCar({
      vin: payload.vin,
      name: `${payload.make} ${payload.model}`,
      images: payload.images || [],
      productionYear: payload.productionYear,
      color: payload.color,
      countryOrigin: payload.country,
      transmission: payload.transmission,
      mileage: payload.mileage,
      engineData: payload.engine,
      owner: user._id,
      serviceHistory: []
    });
  },
  removeServiceHistoryEntry: async (params, user) => {
    const { carId, serviceHistoryId } = params;
    return await service.deleteServiceEntry(user._id, carId, serviceHistoryId)
  },
  deleteSingleCar: async (params, user) => {
    const { carId } = params;
    return await service.deleteCarByOwnerAndId(user._id, carId)
  },
  uploadImage: async(params, user, file) => {
    const { carId } = params;
    return await service.addCarPhoto(user._id, carId, file.path)
  }
};

module.exports = Controller;
