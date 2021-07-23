const ENGINES = [
  {
    id: 1,
    name: '1.5 dci 90',
    engineType: 'diesel',
    power: 66,
    volume: 1461
  },
  {
    id: 2,
    name: '1.2',
    engineType: 'petrol',
    power: 50,
    volume: 1200
  }
];

const CARS= [
  {
    vin: '123456789',
    name: 'Renault Megane',
    productionYear: 2013,
    images: [],
    color: 'white',
    countryOrigin: 'France',
    transmission: 'manual',
    mileage: 210000,
    engine: ENGINES[0]
  },
  {
    vin: '987654321',
    name: 'Zastava 10',
    productionYear: 2007,
    images: [],
    color: 'turquoise blue',
    countryOrigin: 'Serbia',
    transmission: 'manual',
    mileage: 130000,
    engine: ENGINES[1]
  }
];

const OWNERS = [
  {
    id: 1,
    name: 'Marko Savic',
    phoneNumber: '+381 60 365 13 11',
    emailAddress: 'savicmarko993@gmail.com',
    cars: [CARS[0], CARS[1]]
  }
];

module.exports = { OWNERS, CARS, ENGINES };
