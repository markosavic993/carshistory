const repository = require('../repositories/carsRepository');

const Controller = {
  findCarsForUser: () => {
    return { cars: repository.findCarsOwnedBy(1) };
  }
};

module.exports = Controller;
