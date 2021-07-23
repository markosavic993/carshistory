const { OWNERS, CARS } = require('./data');

const Repository = {
  findCarsOwnedBy: ownerId => {
    return OWNERS.find(owner => owner.id === ownerId).cars;
  },
  findCarByVIN: vin => {
    return CARS.find(car => car.vin === vin);
  },
  addNewCar: carData => {
    CARS.push(carData);
  }
};

module.exports = Repository;
