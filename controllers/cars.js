const service = require('../services/carsService');

const Controller = {
  findCarsForUser: async () => {
    return { cars: await service.findCarsOwnedBy('6100166ae330e04aad617900')};
  }
};

module.exports = Controller;
